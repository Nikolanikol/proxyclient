import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-[100px] border-2 border-white px-5">
      <div className="h-full flex flex-row items-center justify-between">
        <div>
          {" "}
          <Link to={"/"}>
            {" "}
            <span className="font-bold text-2xl">Logo</span>{" "}
          </Link>{" "}
        </div>
        <div>user</div>
      </div>
    </div>
  );
};

export default Header;
