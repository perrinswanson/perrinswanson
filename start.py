
import os, signal, sys
import dotenv
import server

def exit(sig, frame):
    sys.exit(0)

if __name__ == "__main__":
    signal.signal(signal.SIGINT, exit)
    
    dotenv.load_dotenv()
    port = int(os.getenv('PORT'))
    debug = os.getenv('DEBUG') == 'true'
    
    server.start(port, debug)
