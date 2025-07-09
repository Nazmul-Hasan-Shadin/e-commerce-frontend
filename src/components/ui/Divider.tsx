import React from "react";
import { Divider } from "@heroui/react";

import Container from "@/src/components/ui/Container";

const Dividers = ({ className }: { className?: string }) => {
  return (
    <Container>
      <Divider className={`bg-primary-color h-[2px] w-48  mt-1 ${className}`} />
    </Container>
  );
};

export default Dividers;
