import React from "react";

const Button = () => {
  //
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(`This is ${event.currentTarget.innerHTML} btn`);
  };
  //
  return (
    <section>
      <button onClick={onClick}>Edit</button>
      <button onClick={onClick}>Delete</button>
    </section>
  );
};

export default Button;
