import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { navLinks } from "../constants";
import ThemeButton from "./ThemeButton";
import { slideIn } from "@/utils/motion";

// ✅ Fixed avatar import issue
const avatarSrc = "/assets/tech/avatar-meta.png"; 
const menuSrc = "/assets/icons/menu.svg";
const closeSrc = "/assets/icons/close.svg";

function Navbar() {
	const [active, setActive] = useState("");
	const [toggle, setToggle] = useState(false);
	const [avatarToggle, setAvatarToggle] = useState(false);

	useEffect(() => {
		document.body.style.overflowY = avatarToggle ? "hidden" : "auto";
	}, [avatarToggle]);

	function AvatarModal() {
		return (
			<aside className="w-[100svw] h-[100svh] flex justify-center items-center bg-[#0000007a] fixed top-0 left-0">
				<div className="sm:w-[500px] sm:h-[500px] xs:w-[400px] xs:h-[400px] w-[200px] h-[200px] dark:bg-[#2b2b42d2] bg-[#e0eaf0] flex justify-center items-center backdrop-blur-sm backdrop-filter bg-opacity-80 rounded-md modal">
					<div className="relative w-[80%] h-[80%] rounded-md">
						<Image
							src={avatarSrc}
							alt="avatar"
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
							className="object-cover rounded-md w-9 h-9"
						/>
						<div
							className="w-[28px] h-[28px] flex justify-center items-center cursor-pointer absolute top-[-30px] right-[-30px]"
							onClick={() => setAvatarToggle(!avatarToggle)}
						>
							<Image src={closeSrc} alt="Close" width={20} height={20} />
						</div>
					</div>
				</div>
			</aside>
		);
	}

	return (
		<>
			<nav className="fixed top-0 z-30 flex items-center w-full py-5 bg-transparent paddingX backdrop-filter backdrop-blur-xl bg-opacity-60">
				{avatarToggle && <AvatarModal />}
				<div className="flex items-center justify-between w-full mx-auto max-w-7xl">
					<div className="flex items-center gap-6">
						<div className="relative cursor-pointer w-9 h-9" onClick={() => setAvatarToggle(!avatarToggle)}>
							<Image
								src={avatarSrc}
								alt="avatar"
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
								className="object-cover rounded-full"
							/>
						</div>
						<Link href="/" className="dark:text-ctnPrimaryDark text-ctnPrimaryLight text-[18px] font-bold cursor-pointer flex">
							Shikhar Singh &nbsp;
							<span className="hidden lg:block"> | Web Developer</span>
						</Link>
					</div>

					<ul className="flex-row items-center hidden gap-10 list-none md:flex">
						{navLinks.map((nav) => (
							<li
								key={nav.id}
								className={`text-[18px] font-medium cursor-pointer ${
									active === nav.title
										? "text-quaternary dark:text-quaternary border-b-2 border-quaternary"
										: "hover:text-tertiary hover:dark:text-tertiary hover:border-y-2"
								}`}
								onClick={() => setActive(nav.title)}
							>
								<a href={`#${nav.id}`}>{nav.title}</a>
							</li>
						))}
						<li className="text-[18px] font-medium cursor-pointer">
							<ThemeButton />
						</li>
					</ul>

					<div className="flex items-center justify-end flex-1 md:hidden">
						<div className="cursor-pointer w-[28px] h-[28px]" onClick={() => setToggle(!toggle)}>
							<Image src={toggle ? closeSrc : menuSrc} alt="Menu" width={20} height={20} />
						</div>

						<motion.div
							variants={slideIn("right", "tween", 0, 0.3)}
							initial="hidden"
							whileInView="show"
							className={`${!toggle ? "hidden" : "flex"} p-6 bg-bgSecondaryLight dark:bg-bgSecondaryDark absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
						>
							<ul className="flex flex-col items-start justify-end flex-1 gap-4 list-none">
								{navLinks.map((nav) => (
									<li
										key={nav.id}
										className={`text-[16px] font-medium cursor-pointer ${
											active === nav.title
												? "text-secondary"
												: "dark:text-ctnPrimaryDark text-ctnPrimaryLight"
										}`}
										onClick={() => {
											setToggle(!toggle);
											setActive(nav.title);
										}}
									>
										<a href={`#${nav.id}`}>{nav.title}</a>
									</li>
								))}
								<li className="text-[18px] font-medium cursor-pointer">
									<ThemeButton />
								</li>
							</ul>
						</motion.div>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
