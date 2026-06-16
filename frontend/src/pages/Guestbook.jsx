import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function Guestbook() {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch comments
  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_URL}/api/guestbook`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (err) {
      console.error("Error loading guestbook comments: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim()) {
      setErrorMsg('Please enter a username');
      return;
    }
    if (!content.trim()) {
      setErrorMsg('Please enter a message');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/guestbook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          content: content.trim(),
        }),
      });

      if (response.ok) {
        // Clear form
        setUsername('');
        setContent('');
        // Reload comments list
        await fetchComments();
      } else {
        const txt = await response.text();
        setErrorMsg(txt || 'Failed to submit comment');
      }
    } catch (err) {
      setErrorMsg('Network error. Is the backend running?');
    } finally {
      setSubmitting(false);
    }
  };

  // Format date helper
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (err) {
      return 'Just now';
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1.5fr',
      gap: '40px',
      alignItems: 'start',
      width: '100%',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
      {/* Left Column: Post Form */}
      <div className="glass-panel" style={{
        padding: '30px',
        position: 'sticky',
        top: '110px',
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          marginBottom: '10px',
          background: 'linear-gradient(to right, var(--color-orange), var(--color-yellow))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Leave a Message
        </h2>
        <p style={{ color: 'var(--color-ash)', fontSize: '0.85rem', marginBottom: '24px' }}>
          Leave a note for Bonfire 15 and The Camp. Let us know which song you're vibing with!
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {errorMsg && (
            <div style={{
              padding: '10px 14px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              color: '#ff4d4d',
              fontSize: '0.85rem',
              fontWeight: '500',
            }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-cream)' }}>Username / Camp Call Sign</label>
            <input
              type="text"
              placeholder="e.g. PineConeHiker"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={submitting}
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 94, 0, 0.15)',
                color: 'var(--color-cream)',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'var(--transition-smooth)',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-pink)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 94, 0, 0.15)'}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-cream)' }}>Your Message</label>
            <textarea
              rows="4"
              placeholder="Write something cozy..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={submitting}
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 94, 0, 0.15)',
                color: 'var(--color-cream)',
                fontSize: '0.95rem',
                outline: 'none',
                resize: 'none',
                transition: 'var(--transition-smooth)',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-pink)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 94, 0, 0.15)'}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-orange)',
              color: 'white',
              fontWeight: '700',
              fontSize: '0.95rem',
              boxShadow: '0 4px 10px var(--color-orange-glow)',
              transition: 'var(--transition-smooth)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-pink)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-orange)'}
          >
            {submitting ? 'Sending...' : 'Toss message into the fire'}
          </button>
        </form>
      </div>

      {/* Right Column: Messages Wall */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontFamily: 'var(--font-display)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          paddingBottom: '12px',
          color: 'var(--color-cream)',
        }}>
          Fire-side Chat Board
        </h2>

        {loading ? (
          <p style={{ color: 'var(--color-ash)', textAlign: 'center', padding: '40px' }}>Reading embers...</p>
        ) : comments.length === 0 ? (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <p style={{ color: 'var(--color-ash)', fontSize: '1.1rem' }}>No messages yet around the fire.</p>
            <p style={{ color: 'var(--color-orange)', fontSize: '0.9rem', marginTop: '8px' }}>Be the first to toss a message in!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {comments.map((comment) => (
              <div 
                key={comment.id} 
                className="glass-panel"
                style={{
                  padding: '20px',
                  background: 'rgba(24, 18, 16, 0.4)',
                  animation: 'fadeIn 0.5s ease',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}>
                  <span style={{
                    fontWeight: '700',
                    color: 'var(--color-pink)',
                    fontSize: '1rem',
                  }}>
                    @{comment.username}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-ash)',
                  }}>
                    {formatDate(comment.timestamp)}
                  </span>
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  color: 'var(--color-cream)',
                  whiteSpace: 'pre-wrap',
                }}>
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
