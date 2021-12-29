import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './views/Home';
import Post from './views/Post';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:post" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;
