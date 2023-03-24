import { useContext, useEffect } from "react";
import { AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
import { FaMobileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import InternalDashboardContext from "../UserContext";
import Axios from "axios";

const HomePage = () => {
  const userCtx = useContext(InternalDashboardContext);
  const navigate = useNavigate();

  const GoToContact = () => {
    const element = document.getElementById("ContactFooter");
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const handleLogout = async () => {
    Axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:4000/logout",
    })
      .then((res) => {
        if (res.status === 200) {
          navigate("/login");
          userCtx.setIsUserLoggedIn(false);
          window.sessionStorage.setItem("LoginStatus", false);
        }
        console.log(res);
      })
      .catch((res) => {});
  };

  useEffect(()=>{
    if(window.sessionStorage.LoginStatus === "false"){
      navigate('/login')
    }
  },[])

  return (
    <>
      <div className="h-full w-full absolute overflow-hidden bg-cover overflow-y-scroll custom-scrollbar">
        <header className="bg-blue-600 h-14 w-full text-center flex items-center justify-between px-20">
          <button
            onClick={() => {
              handleLogout();
            }}
            type="button"
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Logout
          </button>

          <p className="text-white text-2xl font-semibold">About React</p>
          <button
            onClick={() => {
              GoToContact();
            }}
            type="button"
            class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-1 text-center mr-2 mb-2"
          >
            Contact
          </button>
        </header>
        <div className="px-40 py-20">
          <p className="text-justify">
            ReactJS is a declarative, efficient, and flexible JavaScript library
            for building reusable UI components. It is an open-source,
            component-based front end library responsible only for the view
            layer of the application. It was created by Jordan Walke, who was a
            software engineer at Facebook. It was initially developed and
            maintained by Facebook and was later used in its products like
            WhatsApp & Instagram. Facebook developed ReactJS in 2011 in its
            newsfeed section, but it was released to the public in the month of
            May 2013. Today, most of the websites are built using MVC (model
            view controller) architecture. In MVC architecture, React is the 'V'
            which stands for view, whereas the architecture is provided by the
            Redux or Flux. A ReactJS application is made up of multiple
            components, each component responsible for outputting a small,
            reusable piece of HTML code. The components are the heart of all
            React applications. These Components can be nested with other
            components to allow complex applications to be built of simple
            building blocks. ReactJS uses virtual DOM based mechanism to fill
            data in HTML DOM. The virtual DOM works fast as it only changes
            individual DOM elements instead of reloading complete DOM every
            time. To create React app, we write React components that correspond
            to various elements. We organize these components inside higher
            level components which define the application structure. For
            example, we take a form that consists of many elements like input
            fields, labels, or buttons. We can write each element of the form as
            React components, and then we combine it into a higher-level
            component, i.e., the form component itself. The form components
            would specify the structure of the form along with elements inside
            of it.
          </p>
          <div className="flex justify-center my-20">
            <img
              src="https://pbs.twimg.com/card_img/1634545054780891136/WQl8Zlzg?format=png&name=medium"
              alt=""
              className="h-80"
            />
          </div>
          <p className="text-justify pt-10">
            Why learn ReactJS? Today, many JavaScript frameworks are available
            in the market(like angular, node), but still, React came into the
            market and gained popularity amongst them. The previous frameworks
            follow the traditional data flow structure, which uses the DOM
            (Document Object Model). DOM is an object which is created by the
            browser each time a web page is loaded. It dynamically adds or
            removes the data at the back end and when any modifications were
            done, then each time a new DOM is created for the same page. This
            repeated creation of DOM makes unnecessary memory wastage and
            reduces the performance of the application. Therefore, a new
            technology ReactJS framework invented which remove this drawback.
            ReactJS allows you to divide your entire application into various
            components. ReactJS still used the same traditional data flow, but
            it is not directly operating on the browser's Document Object Model
            (DOM) immediately; instead, it operates on a virtual DOM. It means
            rather than manipulating the document in a browser after changes to
            our data, it resolves changes on a DOM built and run entirely in
            memory. After the virtual DOM has been updated, React determines
            what changes made to the actual browser's DOM. The React Virtual DOM
            exists entirely in memory and is a representation of the web
            browser's DOM. Due to this, when we write a React component, we did
            not write directly to the DOM; instead, we are writing virtual
            components that react will turn into the DOM.
          </p>
          <div className="flex justify-center my-20">
            <img
              src="https://www.webrexstudio.com/wp-content/uploads/2019/05/react-js-image.png"
              alt=""
              className="h-80"
            />
          </div>
        </div>
        <footer className="bg-blue-600 h-32 w-full" id="ContactFooter">
          <span className="font-semibold text-2xl text-white">Contact</span>
          <div className="flex justify-between mt-6 px-20">
            <span className="w-48">
              <span className="flex items-center">
                <AiOutlineMail />
                sutkarsh414@gmail.com
              </span>
              <span className="flex items-center">
                <FaMobileAlt />
                +91 8382046797
              </span>
            </span>
            <span>
              <span className="flex items-center">
                <AiFillLinkedin />
                <a
                  href="https://www.linkedin.com/in/utkarsh-srivastava-b57321128/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:font-semibold hover:text-white"
                >
                  Linkedin
                </a>
              </span>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
