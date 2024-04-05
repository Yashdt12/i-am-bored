import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';

const title = 'I am bored';

function App() {
  return (
    <div className="App">
      <Header title={title} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
