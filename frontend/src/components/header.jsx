import logo from "../assets/logo.png";

function Header() {
  return (
    <header id="header">
        <img src={logo} className="logo" alt="logo" width={100} height={100} />
    </header>
  );
}

export default Header;