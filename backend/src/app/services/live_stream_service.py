import cv2
import time
from typing import Generator


def generate_frames(rtsp_url: str) -> Generator[bytes, None, None]:
    """Connects to an RTSP stream and yields JPEG-encoded frames (MJPEG)"""

    def open_stream():
        """Open RTSP video stream."""
        cap = cv2.VideoCapture(rtsp_url)
        if not cap.isOpened():
            return None
        return cap

    cap = open_stream()
    retry_delay = 1  # Initial retry delay in seconds

    try:
        while True:
            # Reconnect if stream is closed
            if cap is None or not cap.isOpened():
                time.sleep(retry_delay)
                cap = open_stream()
                # Used to increase the wait time after each failure reset at success
                retry_delay = min(retry_delay * 2, 16)  # Exponential backoff
                continue

            success, frame = cap.read()
            if not success:
                cap.release()
                cap = None
                continue

            retry_delay = 1  # Reset delay on success

            # Encode frame to JPEG format
            ret, buffer = cv2.imencode(".jpg", frame)
            if not ret:
                continue

            # Yield frame in multipart format for streaming
            # Used to stream video frames as MJPEG (Motion JPEG)
            yield (
                b"--frame\r\nContent-Type: image/jpeg\r\n\r\n"
                + buffer.tobytes()
                + b"\r\n"
            )

    finally:
        if cap:
            cap.release()
