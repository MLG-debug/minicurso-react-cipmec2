import Image from "next/image";

export default function Header() {
  return (
    <header className="
    bg-zinc-950
      h-[200px]
      flex
      items-center
      justify-center
      py-[4.5rem]
    ">
        <Image 
        src="Logo.svg"
        alt="Logo TO-DO List"
        width={263}
        height={48}
        priority
        />
    </header>
  )
}