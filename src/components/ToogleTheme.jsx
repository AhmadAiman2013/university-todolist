import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { SunIcon } from "@heroicons/react/24/solid";
import { MoonIcon } from "@heroicons/react/24/solid";

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage("theme", "night");
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setTheme(isChecked ? "fantasy" : "night");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="flex justify-end items-center">
      <SunIcon className="h-8 w-8 text-accent" />
      <div className="form-control sticky top-0 z-50 bg-transparent p-2">
        <label className="cursor-pointer">
          <input
            type="checkbox"
            className="toggle toggle-accent"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      <MoonIcon className="h-8 w- text-accent" />
    </div>
  );
}
