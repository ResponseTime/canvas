# Canvas Mini Projects

A collection of mini projects exploring the HTML5 Canvas API. This project includes functionalities such as image cropping, resizing, undo/redo operations, and shape manipulations.

## Features

- **Image Cropping**: Select and crop an image using a resizable cropper.
- **Image Resizing**: Resize an image dynamically using draggable points.
- **Undo/Redo**: Maintain a stack for undo and redo actions on canvas modifications.
- **Circle Spawn**: Click to generate circles within a constrained area.
- **Basic Shape Animations**: Animated block movement along a predefined path.

## Project Structure

```
Canvas-Mini-Projects/
│── index.html      # Main HTML file
│── index.js        # JavaScript logic for canvas operations
│── style.css       # Styles for UI components
```

## Setup and Usage

### Prerequisites
Ensure you have a modern web browser (Chrome, Firefox, Edge, etc.) to run the project.

### Running the Project
1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/canvas-mini-projects.git
   ```
2. Navigate to the project folder:
   ```sh
   cd canvas-mini-projects
   ```
3. Open `index.html` in your browser.

## Usage Instructions

### Image Cropping
- Select **"crop_image"** from the dropdown.
- Adjust the cropper and click the **Crop** button.

### Image Resizing
- Select **"resize_image"** from the dropdown.
- Drag the cropper's corner points to resize the image.

### Undo/Redo Actions
- Click **Undo** to revert the last change.
- Click **Redo** to reapply the last undone change.

### Circle Spawn Feature
- Clicking inside the `#circleSpawn` area creates a red circle at the cursor position.

### Animation
- A block (`#block`) follows a looping animation path.

## Technologies Used
- HTML5 Canvas API
- JavaScript (Vanilla JS)
- CSS (Animations, UI styling)

## Future Improvements
- Add more shape manipulation tools.
- Enhance UI for better interaction.
- Implement advanced image editing features.



