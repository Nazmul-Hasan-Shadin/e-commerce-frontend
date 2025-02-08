import React from "react";
import Container from "@/src/components/ui/Container";
import { Divider } from "@nextui-org/react";

const Dividers = ({ className }: { className?: string }) => {
  return (
    <Container>
      <Divider className={`bg-primary-color h-[2px] w-48  mt-1 ${className}`} />
    </Container>
  );
};

export default Dividers;
