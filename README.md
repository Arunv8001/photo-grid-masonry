# Masonry Gallery App

This project is a React-based image gallery application that interacts with the Unsplash API to fetch and display photos dynamically. The application is optimized for performance and implements modern features such as infinite scrolling, lazy loading, skeleton loaders, and responsive design.

---

## Features

### 1. **Search Functionality**
- Users can search for photos using keywords.
- Results update dynamically, fetching relevant images from the Unsplash API.
- The search term is retained when navigating back from the detail page to the photo list.

### 2. **Masonry Grid Layout**
- Displays images in a visually appealing masonry grid layout.
- Handles varying image sizes gracefully.

### 3. **Detail Page**
- Clicking on a photo navigates to a detailed view.
- Displays a larger version of the photo along with additional information:
  - Title (if available)
  - Photographer's name
  - Date taken
- A back button allows users to return to the photo list.

### 4. **Infinite Scrolling**
- Uses the `IntersectionObserver` API to implement infinite scrolling.
- Automatically fetches and appends additional images as the user scrolls down.

### 5. **Lazy Loading**
- Images are loaded lazily to improve page load performance.
- Images fade in smoothly upon loading to enhance user experience.

### 6. **Skeleton Loaders**
- Displays skeleton loaders while images are being fetched.
- Provides a quick visual indication to the user that content is loading, reducing perceived load time.

### 7. **Responsive Design**
- Fully responsive and adapts to various screen sizes.
- Optimized for both desktop and mobile devices.

---

## Advantages of Key Features

### 1. **useMemo**
- Prevents unnecessary re-renders of the photo list.
- Memoizes the mapped photo components, ensuring only the updated parts of the UI are re-rendered.

### 2. **useCallback**
- Memoizes event handlers like `handleSearch` and `handlePhotoClick`, ensuring they are not recreated unnecessarily.
- Improves performance by reducing the number of renders caused by passing new function references to child components.

### 3. **IntersectionObserver**
- Efficiently implements infinite scrolling by observing when the last photo is in the viewport.
- Minimizes DOM polling, which improves performance and reduces CPU usage compared to traditional scroll event listeners.

### 4. **Lazy Loading with onLoad**
- Images are loaded only when they enter the viewport, significantly reducing initial page load time.
- Implements a smooth fade-in animation on image load, improving user experience.

### 5. **Skeleton Loaders**
- Provides immediate visual feedback while content is loading.
- Improves user perception of performance, even if API requests take time.

### 6. **Responsive Design**
- Ensures a seamless user experience across different devices and screen sizes.
- Optimized layout and performance for both desktop and mobile environments.

---

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/Arunv8001/photo-grid-masonry.git
   ```

2. Navigate to the project directory:
   ```bash
   cd photo-grid-masonry
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Add your Unsplash API key:
   - Create a `.env` file in the root directory.
   - Add the following line with your API key:
     ```env
     REACT_APP_UNSPLASH_API_KEY=your_api_key_here
     ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Future Enhancements
- **Dark Mode**: Add support for a dark theme toggle.
- **Enhanced Filtering**: Allow users to filter images by orientation, color, or category.
- **Favorites**: Enable users to save and view their favorite images.

---

## Acknowledgments
- Powered by the [Pexels API](https://www.pexels.com/api/documentation/#photos-search).
- Built with [React](https://reactjs.org/) and TypeScript.

---

Thank you for exploring the Masonry Gallery App! Feel free to contribute or raise issues to make this project even better.

