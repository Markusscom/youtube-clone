import logo from "../assets/logo.png";

function Header() {
  return (
    <header id="header">
        <img src={logo} class="logo" alt="logo" width={100} height={100} />
    </header>
  );
}

export default Header;