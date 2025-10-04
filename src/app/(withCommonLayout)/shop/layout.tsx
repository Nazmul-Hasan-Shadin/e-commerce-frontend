"use client";
import { useEffect, useRef, useState } from "react";
import SidebarFilter from "../(product)/product/@productfiltersidebar/page";


export default function Layout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setSetScrollTop] = useState<number>(0);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<
    "up" | "down" | null
  >();
  const [bottomVisible, setBottomVisible] = useState(false);
  const [upVisible, setUpVisible] = useState(false);
  const [topOffset, setTopOffset] = useState<number>(0);
  const [downOffset, setDownOffset] = useState<number>(0);

  //==========commented will use latter based on work now this code has issue==============
  // here will implement facebook scroll system

  // useEffect(() => {
  //   const mainDiv = mainRef.current;
  //   if (!mainDiv) return;

  //   const handleScroll = () => {
  //     setSetScrollTop(mainDiv?.scrollTop);
  //   };
  //   mainDiv?.addEventListener("scroll", handleScroll);

  //   return () => {
  //     mainDiv?.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log("scroll position", scrollTop);
  // }, [scrollTop]);

  //  ===============Detect just window scroll ============

  // useEffect(() => {
  //   const handleWindowScroll = () => {
  //     if (window.scrollY > 200) {
  //       setIsSticky(true);
  //     } else {
  //       setIsSticky(false);
  //     }
  //   };
  //   window.addEventListener("scroll", handleWindowScroll);

  //   return () => window.removeEventListener("scroll", handleWindowScroll);
  // }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const liveScrollY = window.scrollY;

      if (liveScrollY < lastScrollY) {
        setScrollDirection("up");
      } else if (liveScrollY > lastScrollY) {
        setScrollDirection("down");
      }
      lastScrollY = liveScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===========sidebar visivility detect=========

  // useEffect(() => {
  //   const sidebar = sideBarRef.current;
  //   if (!sidebar) return;

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       const { top, bottom } = entry.boundingClientRect;

  //       if (scrollDirection === "down") {
  //         // নিচে scroll করলে: যদি sidebar এর bottom পুরোপুরি viewport এ থাকে, তখন fixed করো
  //         if (entry.isIntersecting && bottom <= window.innerHeight) {
  //           // console.log(
  //           //   "Bottom fully visible while scrolling down – sticky ON"
  //           // );
  //           setBottomVisible(true);
  //           setUpVisible(false);
  //           setTopOffset(entry.boundingClientRect.top);
  //           // setIsSticky(true);
  //         } else {
  //           setIsSticky(false);
  //         }
  //       } else if (scrollDirection === "up") {
  //         // উপরে scroll করলে: যদি sidebar এর top পুরোপুরি viewport এ আসে, তখন fixed করো
  //         if (entry.isIntersecting && top >= 0) {
  //           // console.log("Top fully visible while scrolling up – sticky ON");
  //           // setIsSticky(true);
  //           setUpVisible(true);
  //           setBottomVisible(false);
  //           setDownOffset(entry.boundingClientRect.top);
  //         } else {
  //           setIsSticky(false);
  //         }
  //       }
  //     },
  //     {
  //       threshold: 1.0, // only when fully visible
  //     }
  //   );

  //   observer.observe(sidebar);

  //   return () => observer.disconnect();
  // }, [scrollDirection]);

  useEffect(() => {
    const handleScroll = () => {
      const sidebar = sideBarRef.current;
      if (!sidebar) return;

      const { top, bottom, height } = sidebar.getBoundingClientRect();
      console.log(top, bottom, "top bottom");

      const isBottomVisible = bottom <= window.innerHeight && bottom >= 0;
      const isTopVisible = top >= 0 && top <= window.innerHeight;

      if (scrollDirection === "down" && isBottomVisible) {
        setBottomVisible(true);
        setUpVisible(false);
        setTopOffset(top); // sidebar top position
      } else if (scrollDirection === "up" && isTopVisible) {
        setUpVisible(true);
        setBottomVisible(false);
        setDownOffset(top);
      } else {
        setBottomVisible(false);
        setUpVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection]);

  // console.log(isSticky, "isSticky");

  // console.log({ bottomVisible }, { upVisible });

  // console.log("scroll 200 er besi hoysea?", isSticky);
  // console.log(scrollTop, "lol scroll from top");
  // console.log(scrollDirection, "scrollDirection");

  return (
    <section>
      <section className="grid grid-cols-12 mt-4 2xl:mt-8 sm:grid-cols-12 2xl:grid-cols-12 mx-auto w-[96%] gap-4 2xl:gap-x-8">
        <section className="col-span-12    sm:col-span-5 md:col-span-4 lg:col-span-3 2xl:col-span-3">
          <SidebarFilter
            // isSticky={isSticky}
            // isUpVisible={upVisible}
            // isBottomVisible={bottomVisible}
            // topOffset={topOffset}
            // downOffset={downOffset}
            // ref={sideBarRef}
            // scrollDirection={scrollDirection}
          />
        </section>

        <main
          ref={mainRef}
          className={`col-span-12 border sm:col-span-7  md:col-span-8 xl:col-span-9 2xl:col-span-9  `}
        >
          {children}
        </main>
      </section>
    </section>
  );
}
