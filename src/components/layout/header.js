import Link from "next/link";
import { useEffect, useState } from "react";
import { HiX, HiMenu } from "react-icons/hi";
import { useSelector } from "react-redux";

const Navbar = () => {
  let total = 0;

  // let cartCount = 0;

  const [cartCount, setCartCount] = useState(0);

  const cartItem = useSelector((state) => state.c.cart);

  // setTotal(cartItem.map((item) => item.quantity));

  if (cartItem.length > 0) {
    total = cartItem.map((item) => item.quantity);
  }
  // total = cartItem.map((item) => item.quantity);

  // total.forEach((quantity) => {
  //   cartCount = cartCount + quantity;
  // });

  useEffect(() => {
    console.log("use effect fired");
    sumOfItems(total);
  }, [cartItem, total]);

  const sumOfItems = (array) => {
    let sum = 0;

    // array.forEach((item) => {
    //   sum += item;
    // });

    Array.from(array).forEach((item) => {
      sum += item;
    });

    console.log(sum);
    setCartCount(sum);

    return sum;
  };

  console.log("total cart quantity", cartCount);
  const [nav, setNav] = useState(false);

  const handleClick = () => setNav((prev) => !prev);

  let navclasses;
  if (nav) {
    navclasses =
      "md:hidden absolute left-0  text-xl bg-mainbg w-full h-[calc(100vh-80px)] flex justify-center flex-col align-middle px-8 py-10 bg-primary";
  } else {
    navclasses =
      "hidden md:hidden absolute left-0  text-xl bg-mainbg w-full h-[calc(100vh-80px)] flex justify-center flex-col align-middle px-8 py-10 ";
  }
  return (
    // <header className=" h-[80px] z-10 text-white bg-mainbg  relative ">
    <header className="md:sticky md:top-0 h-[80px] z-10 text-white bg-primary  relative ">
      <div className="px-6 flex justify-between items-center w-full h-full md:px-16 lg:px-28">
        <h1 className="text-2xl font-headingFont font-bold mr-4 sm:text-3xl">
          <Link href="/">Food Express</Link>
        </h1>

        <nav className="hidden md:flex md:text-xl ">
          <ul className="hidden md:flex md:items-center text-xl navbar-list">
            <li className="p-4">
              <Link href="/">Home</Link>
            </li>
            <li className="p-4">
              <Link href="/">All Items</Link>
            </li>

            <li className="ml-5">
              <Link href="/cart">
                <div className="bg-white text-black py-2 px-5 rounded-full text-[17px] flex items-center">
                  Cart
                  {cartCount !== 0 ? (
                    <span className="ml-2 py-[3px] px-[9px] text-white text-sm font-bold rounded-full bg-primary">
                      {cartCount}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </Link>
            </li>
            <li className="p-4">
              <Link href="/login">Login</Link>
            </li>
            <li className="p-4">
              <Link href="/signup">Signup</Link>
            </li>
          </ul>
        </nav>

        <div className="md:hidden cursor-pointer" onClick={handleClick}>
          {!nav ? <HiMenu className="" size={30} /> : <HiX size={30} />}
        </div>
      </div>

      {nav && (
        <ul className={navclasses}>
          <li className="text-center py-2" onClick={handleClick}>
            <Link href="/">Home</Link>
          </li>
          <li className="text-center py-2" onClick={handleClick}>
            <Link href="/login">Login</Link>
          </li>
          <li className="text-center py-2" onClick={handleClick}>
            <Link href="/signup">Signup</Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
