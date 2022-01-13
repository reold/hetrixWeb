import { forwardRef } from "preact/compat";

export const Button = (props) => {
  const identifyTheme = () => {
    switch (props.type) {
      case "primary":
        return "bg-primary text-white border-blue-700";
      case "pri":
        return "bg-primary text-white border-blue-700";

      case "secondary":
        return "bg-secondary text-white border-gray-400";
      case "sec":
        return "bg-secondary text-white border-gray-400";

      case "danger":
        return "bg-danger text-white border-red-700";
      case "dan":
        return "bg-danger text-white border-red-700";
    }
  };

  return (
    <button
      className={
        "p-1 rounded-md outline-none border-solid border-b-2 hover:grayscale " +
        identifyTheme() +
        " " +
        (props.className ? props.className : "")
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export const Panel = (props) => {
  const identifyType = () => {
    let className = "flex flex-";

    switch (props.axis) {
      case "horizontal":
        className += "row";
        break;
      case "hor":
        className += "row";
        break;
      case "vertical":
        className += "col";
        break;
      case "ver":
        className += "col";
        break;
    }

    if (props.ic) {
      className += " ";
      className += "items-center";
    }

    if (props.jc) {
      className += " ";
      className += "justify-center";
    }

    if (props.je) {
      className += " ";
      className += "justify-evenly";
    }

    if (props.vis) {
      className += " ";
      className += "bg-gray-900 border-dotted border-2 border-gray-700";
    }

    return className;
  };

  return (
    <div className={identifyType() + " " + props.className}>
      {props.children}
    </div>
  );
};

export const Dialog = (props) => {
  return (
    <>
      {props.open ? (
        <div className="w-full h-full fixed top-0 left-0 flex flex-col justify-center items-center bg-gray-600/[.9] backdrop-blur-sm">
          <div className="bg-secondary w-7/12 xl:w-5/12 shadow-md shadow-secondary flex flex-col items-center space-y-5 p-2 rounded-md text-white">
            {props.children}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export const Input = forwardRef((props, ref) => {
  return (
    <input
      type="text"
      className={
        "p-1 bg-gray-400 rounded-md outline-none ring-2 ring-primary " +
        props.className
      }
      onKeyPress={(e) => {
        e.key === "Enter" && props.onEnter();
      }}
      ref={ref}
      {...props}
    />
  );
});
