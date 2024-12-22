from pyngrok import ngrok

# Set your ngrok authtoken
NGROK_AUTHTOKEN = " "
ngrok.set_auth_token(NGROK_AUTHTOKEN)

# Expose the Rasa server running on port 5005
public_url = ngrok.connect(5005)
print(f"Ngrok Tunnel URL: {public_url}")

# Keep the script running to maintain the tunnel
try:
    print("Ngrok tunnel active. Press Ctrl+C to stop.")
    while True:
        pass
except KeyboardInterrupt:
    print("Shutting down ngrok tunnel.")
    ngrok.disconnect(public_url)
