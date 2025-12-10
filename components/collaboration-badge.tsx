import Image from "next/image";

interface Collaborator {
  logo: string;
  name: string;
}

interface DirectStayBadgeProps {
  className?: string;
  collaborator?: Collaborator | null;
}

export const CollaborationBadge = ({
  className,
  collaborator = null,
}: DirectStayBadgeProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {collaborator && (
        <div className="relative mr-3">
          <Image
            src={"/assets/badge.svg"}
            height={50}
            width={50}
            alt="Directstay badge"
            className="w-8 h-8"
          />
          <Image
            src={collaborator.logo}
            height={50}
            width={50}
            alt={`${collaborator.name} logo`}
            className="w-8 h-8 rounded-full absolute top-0 -right-3 "
          />
        </div>
      )}

      <span className="text-xs font-medium">DirectStay</span>
      <Image
        src={"/assets/verified.svg"}
        height={5}
        width={5}
        alt="Verified badge"
        className="w-4 h-4"
      />

      <div className="text-xs font-medium px-2 py-1 bg-white/10 rounded-full">
        collab
      </div>
    </div>
  );
};
