# GIF Studio

A modern web application for creating and customizing animated GIFs, built with Next.js and AWS S3. This full-stack project showcases seamless image processing, real-time preview capabilities, and a polished user interface.

### Live Demo
Visit the live application at [https://interview-blond-eight.vercel.app/](https://interview-blond-eight.vercel.app/)

### Features
- Process up to 20 frames at 400x400 resolution with aspect ratio preservation
- Drag-and-drop interface for intuitive image management
- Real-time preview with adjustable animation speeds (slow/normal/fast)
- Secure AWS S3 integration for reliable file storage
- Modern, responsive UI with TypeScript for type safety
- Multi-file upload support (JPG/PNG up to 5MB each)
- Image reordering and frame deletion capabilities

### Technical Stack
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Image Processing**: Sharp for high-performance image manipulation
- **GIF Creation**: GIF-encoder for optimized animation generation
- **Storage**: AWS S3 for scalable file management
- **Development**: TypeScript for enhanced code reliability

### Architecture
The application follows a modern full-stack architecture:
1. **Frontend Layer**: React components with TypeScript for type safety
2. **API Layer**: Next.js API routes for server-side processing
3. **Processing Layer**: Sharp for image optimization and GIF-encoder for animation
4. **Storage Layer**: AWS S3 for secure and scalable file storage

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/yashmit07/Gif-Grayscale-Creator.git
   cd Gif-Grayscale-Creator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_BUCKET_NAME=your_bucket_name
   AWS_REGION=your_region
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Technical Specifications
- **Image Processing**:
  - Output Resolution: 400x400 pixels
  - Aspect Ratio: Preserved with white background
  - Maximum Frames: 20 images
  - File Size Limit: 5MB per image
  - Supported Formats: JPG, PNG

- **Animation**:
  - Multiple speed options
  - Real-time preview matching final output
  - Configurable frame intervals
  - Infinite loop support

### Example Output
The GIF maker was tested with a sequence of bird animation frames:

<div style="display: flex; gap: 10px;">
    <img src="docs/test-images/bird1.png" width="200" alt="Bird frame 1">
    <img src="docs/test-images/bird2.png" width="200" alt="Bird frame 2">
    <img src="docs/test-images/bird3.png" width="200" alt="Bird frame 3">
    <img src="docs/test-images/bird4.png" width="200" alt="Bird frame 4">
</div>

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Author
Created by Yashmit Singh
