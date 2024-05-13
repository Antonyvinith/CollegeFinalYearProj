import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../Styling/home-page.css";

const Home = () => {

  return (
    <>
      <Header />
      <div
        className="home-page"
        style={{
          marginTop: "80px",
          backgroundImage:
            "url('https://t3.ftcdn.net/jpg/02/76/35/04/360_F_276350472_ntb7bpLFZ02bLhwz0rPI4Ge28vbkwFna.jpg')",
        }}
      >
        {" "}
        {/* Use CSS module class */}
        <div className="content-box">
          <h1>Welcome to our store!</h1>
          <p>We Believe in a Future of Frictionless Commerce</p>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Home;
