package com.bonfire15.config;

import com.bonfire15.model.Song;
import com.bonfire15.model.Comment;
import com.bonfire15.repository.SongRepository;
import com.bonfire15.repository.CommentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final SongRepository songRepository;
    private final CommentRepository commentRepository;

    public DatabaseSeeder(SongRepository songRepository, CommentRepository commentRepository) {
        this.songRepository = songRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Create songs folder
        String songsDirPath = "./songs";
        File songsDir = new File(songsDirPath);
        if (!songsDir.exists()) {
            songsDir.mkdirs();
        }

        // 2. Generate procedural WAV files if they don't exist
        generateSongsIfNotExist(songsDirPath);

        // 3. Seed Songs in Database (songs disabled for now)
        /*
        if (songRepository.count() == 0) {
            seedSongs();
        }
        */

        // 4. Seed Comments in Database
        if (commentRepository.count() == 0) {
            seedComments();
        }
    }

    private void seedSongs() {
        songRepository.save(new Song(
                "Ember Shadows",
                "Bonfire 15 (feat. The Camp)",
                "Recorded late night during a freezing rainstorm at The Camp. We gathered around the fire pit with an acoustic guitar and a handheld zoom recorder. The crackling sounds you hear in the background are actual glowing pine embers popping in real-time.",
                "0:15",
                "[Verse 1]\nGather around the ember shadows, the night is growing cold...\nStories in the wood-smoke, secrets to be told...\n\n[Chorus]\nWe watch the sparks fly higher, up into the black...\nOnce you find the bonfire, there is no going back...",
                "/songs/ember_shadows.wav",
                42
        ));

        songRepository.save(new Song(
                "Sparks in the Wind",
                "Bonfire 15",
                "An upbeat, electronic arpeggiated track inspired by the sparks rising from a roaring bonfire. The melody is energetic and bouncy, capturing the creative sparks flying between band members during our summer sessions.",
                "0:15",
                "[Verse 1]\nUp from the ash they rise, lighting up the sky\nJust a single glowing speck, refusing now to die\n\n[Chorus]\nLike sparks in the wind, we dance through the dark\nBurning like a beacon, carrying the spark...",
                "/songs/sparks_in_the_wind.wav",
                56
        ));

        songRepository.save(new Song(
                "Campfire Chorus",
                "Bonfire 15 (feat. The Camp Sessionists)",
                "A slow, cozy anthem designed to be sung in unison. Features deep bass pads simulating the warmth of the fire and a custom procedural noise filter that mimics the crackles and snaps of dry cedar logs.",
                "0:15",
                "[Verse 1]\nTake your place beside me, pull your collar tight\nWe've got all we need right here, to carry through the night\n\n[Chorus]\nOh, sing with the choir, under stars so bright\nFeed the bonfire higher, till the morning light...",
                "/songs/campfire_chorus.wav",
                89
        ));

        songRepository.save(new Song(
                "Neon Flame",
                "Bonfire 15",
                "Blending the organic acoustic nature of The Camp with retro 80s synth wave filters. This track represents the future direction of Bonfire 15: neon-cyber-campfire music.",
                "0:15",
                "[Verse 1]\nPurple smoke is rising, glowing orange-bright\nSynthesizers blending with the forest night\n\n[Chorus]\nIt's a neon flame, burning in the cold\nA story of the future, that has not been told...",
                "/songs/neon_flame.wav",
                127
        ));
    }

    private void seedComments() {
        commentRepository.save(new Comment("CampCounselorDan", "This group is bringing a whole new energy to The Camp! Ember Shadows is on repeat. 🔥"));
        commentRepository.save(new Comment("AcousticAlley", "The visualizer on this page is so therapeutic. It looks like a real campfire. Matches the logo perfectly!"));
        commentRepository.save(new Comment("LofiLover", "Neon Flame is such a vibe. Blending retro synths with campfire crackles is absolute genius. Can't wait for the album!"));
        commentRepository.save(new Comment("WoodsWalker", "I was there at the fire pit when they recorded the crackles for Ember Shadows. Best summer of my life."));
    }

    private void generateSongsIfNotExist(String dir) {
        try {
            generateWav(dir + "/ember_shadows.wav", 1);
            generateWav(dir + "/sparks_in_the_wind.wav", 2);
            generateWav(dir + "/campfire_chorus.wav", 3);
            generateWav(dir + "/neon_flame.wav", 4);
        } catch (IOException e) {
            System.err.println("Error generating procedural WAV files: " + e.getMessage());
        }
    }

    private void generateWav(String filepath, int trackType) throws IOException {
        File file = new File(filepath);
        if (file.exists()) {
            return; // Don't regenerate
        }

        int sampleRate = 22050;
        int durationSeconds = 15;
        int numSamples = sampleRate * durationSeconds;
        int bitsPerSample = 16;
        int numChannels = 1;
        int byteRate = sampleRate * numChannels * (bitsPerSample / 8);
        int blockAlign = numChannels * (bitsPerSample / 8);
        int dataSize = numSamples * numChannels * (bitsPerSample / 8);
        int fileSize = 36 + dataSize;

        try (FileOutputStream fos = new FileOutputStream(file);
             BufferedOutputStream bos = new BufferedOutputStream(fos)) {
            
            // RIFF Header
            bos.write("RIFF".getBytes());
            writeInt(bos, fileSize);
            bos.write("WAVE".getBytes());

            // fmt chunk
            bos.write("fmt ".getBytes());
            writeInt(bos, 16); // Chunk size
            writeShort(bos, (short) 1); // Audio format PCM
            writeShort(bos, (short) numChannels);
            writeInt(bos, sampleRate);
            writeInt(bos, byteRate);
            writeShort(bos, (short) blockAlign);
            writeShort(bos, (short) bitsPerSample);

            // data chunk
            bos.write("data".getBytes());
            writeInt(bos, dataSize);

            // Write PCM audio data
            double[] frequencies = getChordsForTrack(trackType);

            // Crackle sound tracker
            int crackleCooldown = 0;

            for (int i = 0; i < numSamples; i++) {
                double t = (double) i / sampleRate;
                
                // Determine chord based on time (change chord every 1.875 seconds)
                int chordIndex = (int)(t / 1.875) % frequencies.length;
                double mainFreq = frequencies[chordIndex];

                // Base waveform
                double value = 0.0;
                
                if (trackType == 1) {
                    // Ember Shadows - Warm Sine Pad with chords (Root, Third, Fifth)
                    double f1 = mainFreq;
                    double f2 = mainFreq * 1.25; // Major third or minor third approx
                    double f3 = mainFreq * 1.5;  // Fifth
                    
                    // Simple C Major, G Major, A Minor, F Major approximations
                    if (chordIndex == 2) { // Am - minor third
                        f2 = mainFreq * 1.20;
                    }
                    
                    value = (Math.sin(2 * Math.PI * f1 * t) + 
                             Math.sin(2 * Math.PI * f2 * t) + 
                             Math.sin(2 * Math.PI * f3 * t)) / 3.0;

                    // Apply decaying pluck envelope every 1.875 seconds
                    double envelope = 1.0 - ((t % 1.875) / 1.875);
                    value *= envelope;
                } 
                else if (trackType == 2) {
                    // Sparks in the Wind - Fast arpeggio (square wave)
                    double arpTime = t * 6.0; // 6 notes per second
                    int noteIndex = (int) arpTime % 4;
                    double frequency = mainFreq;
                    if (noteIndex == 1) frequency *= 1.25;
                    else if (noteIndex == 2) frequency *= 1.5;
                    else if (noteIndex == 3) frequency *= 2.0;

                    // Square wave
                    value = Math.sin(2 * Math.PI * frequency * t) >= 0 ? 0.4 : -0.4;
                    
                    // Quick decay on each arpeggio step
                    double envelope = 1.0 - ((arpTime % 1.0) / 1.0);
                    value *= envelope;
                }
                else if (trackType == 3) {
                    // Campfire Chorus - Deep Sine Bass + Simulated Crackling Fires
                    value = Math.sin(2 * Math.PI * mainFreq * t);
                    
                    // Add crackles
                    double crackle = 0.0;
                    if (crackleCooldown > 0) {
                        crackleCooldown--;
                        crackle = (Math.random() * 2.0 - 1.0) * 0.8;
                    } else if (Math.random() < 0.003) {
                        crackleCooldown = (int)(Math.random() * 20) + 5; // duration of click
                        crackle = (Math.random() * 2.0 - 1.0) * 0.9;
                    }
                    
                    value = value * 0.5 + crackle * 0.5;
                }
                else {
                    // Neon Flame - Retro pulse wave bassline + LFO modulation
                    double lfo = 1.0 + 0.1 * Math.sin(2 * Math.PI * 4 * t); // 4Hz LFO
                    double wave = Math.sin(2 * Math.PI * (mainFreq / 2.0) * t * lfo);
                    // Soft clipping to resemble pulse/triangle wave
                    value = Math.max(-0.6, Math.min(0.6, wave * 1.5));
                }

                // Master volume clamp and short convert
                short pcmSample = (short) (value * 12000); // 12000 out of 32767 to avoid clipping
                writeShort(bos, pcmSample);
            }
        }
    }

    private double[] getChordsForTrack(int trackType) {
        if (trackType == 1) {
            // C - G - Am - F
            return new double[]{ 261.63, 196.00, 220.00, 174.61 };
        } else if (trackType == 2) {
            // Am - F - C - G
            return new double[]{ 220.00, 174.61, 261.63, 196.00 };
        } else if (trackType == 3) {
            // C - G - Am - F (lower octave)
            return new double[]{ 130.81, 98.00, 110.00, 87.31 };
        } else {
            // Dm - Bb - F - C
            return new double[]{ 146.83, 116.54, 174.61, 130.81 };
        }
    }

    private void writeInt(OutputStream out, int value) throws IOException {
        out.write(value & 0xFF);
        out.write((value >> 8) & 0xFF);
        out.write((value >> 16) & 0xFF);
        out.write((value >> 24) & 0xFF);
    }

    private void writeShort(OutputStream out, short value) throws IOException {
        out.write(value & 0xFF);
        out.write((value >> 8) & 0xFF);
    }
}
