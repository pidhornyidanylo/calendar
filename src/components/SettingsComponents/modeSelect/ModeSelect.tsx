import type React from "react";
import SwitchTheme from "./switchTheme/SwitchTheme";

const ModeSelect: React.FC = () => {
	return (
		<>
			<h3>Enable Dark Mode</h3>
			<p>Switch between light and dark themes.</p>
			<SwitchTheme />
		</>
	);
};

export default ModeSelect;
