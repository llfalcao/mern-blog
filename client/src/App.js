import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Post from './views/Post';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:post" element={<Post />} />
    </Routes>
  );
}

export default App;
