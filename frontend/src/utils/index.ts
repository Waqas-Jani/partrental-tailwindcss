/* eslint-disable @typescript-eslint/no-explicit-any */
// Animation with wowjs
// export const animation = async () => {
//     if (typeof window !== "undefined") {
//         const { WOW } = await import("wowjs");
//         new WOW().init();
//     }
// };



// Pagination
export const getPagination = (totalNumber: number, sort: number) => {
    const arr = new Array(Math.ceil(totalNumber / sort))
        .fill(0)
        .map((_, idx) => idx + 1);
    return arr;
};

// change pagination and update pagination and content
export const pagination = (listClass: string, sort: number, active: number) => {
    const list = document.querySelectorAll(listClass);
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (active === 1) {
            if (i < sort) {
                element.classList.remove("d-none");
            } else {
                element.classList.add("d-none");
            }
        } else {
            if (i >= (active - 1) * sort && i < active * sort) {
                element.classList.remove("d-none");
            } else {
                element.classList.add("d-none");
            }
        }
    }
};

export const scrollTopFun = () => {
    const scrollUp = document.getElementById("scroll-top"),
        lastScrollTop = 0;

    window.addEventListener("scroll", () => {
        const st = window.scrollY;
        if (st < 600) {
            if (scrollUp?.style) {
                scrollUp.style.display = "none";
            }
        } else {
            if (scrollUp?.style) {
                scrollUp.style.display = "inline-block";
            }
        }
    });
};

export const convertToDailNumber = (number: string) => {
    return number.replace(/[- )(]/g, "");
};

export const sortByPrice = (arr: any, order: string) => {
    if (order === "asc") {
        return arr.sort(
            (a: any, b: any) =>
                parseFloat(a.node.priceRangeV2?.maxVariantPrice?.amount) -
                parseFloat(b.node.priceRangeV2?.maxVariantPrice?.amount)
        );
    } else if (order === "des") {
        return arr.sort(
            (a: any, b: any) =>
                parseFloat(b?.node.priceRangeV2?.maxVariantPrice?.amount) -
                parseFloat(a?.node.priceRangeV2?.maxVariantPrice?.amount)
        );
    }
};

export const sortByDate = (arr: any, order: string) => {
    if (order === "asc") {
        return arr.sort(
            (a: any, b: any) => new Date(a.node.createdAt).getTime() - new Date(b.node.createdAt).getTime()
        );
    } else if (order === "des") {
        return arr.sort(
            (a: any, b: any) => new Date(b?.node.createdAt).getTime() - new Date(a?.node.createdAt).getTime()
        );
    }
};

export const slug = (link: string) => {
    return link?.startsWith("/") ? link : `/${link}`;
};
