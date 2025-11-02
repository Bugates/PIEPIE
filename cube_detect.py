from picamera2 import Picamera2
import cv2
import numpy as np

picam2 = Picamera2()
picam2.start()

color_ranges = {
    "white":   ([0, 0, 200], [180, 30, 255]),
    "yellow":  ([20, 100, 100], [30, 255, 255]),
    "red1":    ([0, 100, 100], [10, 255, 255]),
    "red2":    ([160, 100, 100], [180, 255, 255]),
    "green":   ([40, 50, 50], [80, 255, 255]),
    "blue":    ([100, 50, 50], [140, 255, 255]),
    "orange":  ([10, 100, 100], [20, 255, 255])
}

def detect_color(hsv_region):
    counts = {}
    for color, (lower, upper) in color_ranges.items():
        lower = np.array(lower)
        upper = np.array(upper)
        mask = cv2.inRange(hsv_region, lower, upper)
        if color == "red1":
            mask2 = cv2.inRange(hsv_region, np.array(color_ranges["red2"][0]), np.array(color_ranges["red2"][1]))
            mask = mask + mask2
        counts[color] = cv2.countNonZero(mask)
    dominant_color = max(counts, key=counts.get)
    if dominant_color in ["red1", "red2"]:
        dominant_color = "red"
    return dominant_color

while True:
    frame = picam2.capture_array()
    frame_bgr = cv2.cvtColor(frame, cv2.COLOR_RGBA2BGR)
    hsv = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2HSV)
    height, width, _ = frame_bgr.shape
    grid_h = height // 3
    grid_w = width // 3
    cube_face = []
    for i in range(3):
        row = []
        for j in range(3):
            x1 = j * grid_w
            y1 = i * grid_h
            x2 = x1 + grid_w
            y2 = y1 + grid_h
            cell = hsv[y1:y2, x1:x2]
            color = detect_color(cell)
            row.append(color)
            cv2.rectangle(frame_bgr, (x1, y1), (x2, y2), (0, 0, 0), 2)
            cv2.putText(frame_bgr, color, (x1 + 5, y1 + 25), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 2)
        cube_face.append(row)
    cv2.imshow("Live Cube Detection", frame_bgr)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

picam2.close()
cv2.destroyAllWindows()
