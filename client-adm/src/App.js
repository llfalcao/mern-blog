import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './views/Home';
import Posts from './views/Posts';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </>
  );
}

export default App;
