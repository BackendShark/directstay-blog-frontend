import Image from "next/image";

interface Collaborator {
  logo: string;
  name: string;
}

interface DirectStayBadgeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  collaborator?: Collaborator | null;
}

export const CollaborationBadge = ({
  className,
  size = "md",
  collaborator = null,
}: DirectStayBadgeProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {collaborator && (
        <div className="relative mr-3">
          <Image
            src={"/assets/badge.svg"}
            height={size === "sm" ? 20 : size === "md" ? 30 : 50}
            width={size === "sm" ? 20 : size === "md" ? 30 : 50}
            alt="Directstay badge"
            className="w-6 h-6"
          />
          <Image
            src={collaborator.logo}
            height={size === "sm" ? 20 : size === "md" ? 30 : 50}
            width={size === "sm" ? 20 : size === "md" ? 30 : 50}
            alt={`${collaborator.name} logo`}
            className="w-8 h-8 rounded-full absolute top-0 -right-3 "
          />
        </div>
      )}
      {!collaborator && (
        <Image
          src={"/assets/badge.svg"}
          height={size === "sm" ? 20 : size === "md" ? 30 : 50}
          width={size === "sm" ? 20 : size === "md" ? 30 : 50}
          alt="Directstay badge"
          className="w-8 h-8"
        />
      )}
      <span className="text-xs font-medium">DirectStay</span>
      <Image
        src={"/assets/verified.svg"}
        height={5}
        width={5}
        alt="Verified badge"
        className="w-4 h-4"
      />

      {collaborator && (
        <div className="text-xs font-medium px-2 py-1 bg-white/10 rounded-full">
          collab
        </div>
      )}
    </div>
  );
};
