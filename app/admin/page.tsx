import AuthLayout from "./Auth/layout";
import SignIn from "./Auth/signIn/page";

export default function Main() {
  return (
    <div>
      <AuthLayout
        children={
          <div>
            <SignIn />
          </div>
        }
      />
    </div>
  );
}
