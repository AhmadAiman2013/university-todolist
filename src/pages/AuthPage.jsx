import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useContext } from "react";
import { 
  createUserWithEmailAndPassword,
 getAuth,
signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";


export default function AuthPage() {
  const [showHero, setShowHero] = useState(true);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userUID, setUserUID] = useState("")
  const [warning, setWarning] = useState(false)
  const navigate = useNavigate()
  const auth = getAuth()
  const { currentUser } = useContext(AuthContext)
  
  useEffect(() => {
    if (currentUser) {
      navigate(`/dashboard/${userUID}`); 
    }
  }, [currentUser, navigate, userUID]);

  const handleLogin = () => {
    setShowHero(false);
    setIsSignUp(false);
  };

  const handleSignup = () => {
    setShowHero(false);
    setIsSignUp(true);
  };

  const handleGoBack = () => {
    setShowHero(true);
    setIsSignUp(true);
  };

  const handleFormSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setWarning(false)
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const uid = res.user.uid; 
        setUserUID(uid); 
        console.log("User UID:", uid);
      } catch (error) {
        console.error(error);
      }
    } else {
      setWarning(true)
    }
      
  }

  const handleFormLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid; 
      setUserUID(uid); 
      console.log("User UID:", uid);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <ShieldCheckIcon className="h-6 w-6 text-accent" />
          <a className="btn btn-ghost normal-case text-xl" onClick={handleGoBack}>duDis</a>
        </div>
        <div className="navbar-end">
          <a className="btn mr-2" onClick={handleLogin}>
            Login
          </a>
          <a className="btn btn-outline" onClick={handleSignup}>Signup</a>
        </div>
      </div>

      {showHero && (
        <div className="hero flex-grow bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">
                <span className="text-primary">d</span>
                <span className="text-secondary">u</span>
                <span className="text-success">D</span>
                <span className="text-primary">i</span>
                <span className="text-secondary">s</span>
                <span className="text-success">,</span> just do this
              </h1>
              <p className="py-6">
                Keep track of the daily university task and assignment in one
                click
              </p>
              <button className="btn btn-accent" onClick={() => setShowHero(false)}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {!showHero && (
        <section className="bg-base-200 flex items-center justify-center h-screen">
          <div className="container bg-base-100 rounded-lg p-4 mx-auto w-96 flex flex-col relative">
            <form onSubmit={isSignUp ? handleFormSignUp : handleFormLogin}>
              <div className="font-bold text-xl mb-4">
                {isSignUp ? "Sign Up" : "Login"}
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">What is your email?</span>
                </label>
                <input
                  type="email"
                  placeholder="Type here"
                  className="input input-bordered input-accent w-full"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">What is your password?</span>
                </label>
                <input
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered input-accent w-full"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {isSignUp && (
                <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Retype your password</span>
                </label>
                <input
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered input-accent w-full"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {warning && (
                  <label className="label">
                  <span className="label-text-alt text-error">Password must be same!</span>
                </label>
                )}
              </div>
              )}

              <div className="flex justify-end">
                <div className="form-control mb-4 w-20">
                  <button className="btn btn-info">
                    {isSignUp ? "Submit" : "Login"}
                  </button>
                </div>
              </div>
            </form>

            {isSignUp ? (
              <p>
                If you already have an account, you can{" "}
                <span
                  className="cursor-pointer underline"
                  onClick={handleLogin}
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                Dont have an account?{" "}
                <span
                  className="cursor-pointer underline"
                  onClick={handleSignup}
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
