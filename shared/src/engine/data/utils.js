export const perspectiveLayout = ({ l, r, b, t }) =>
    new Quad({
        x1: l * b,
        x2: l * t,
        x3: r * t,
        x4: r * b,
        y1: b,
        y2: t,
        y3: t,
        y4: b,
    })
export const NormalLayout = ({ l, r, b, t }) =>
    new Quad({
        x1: l,
        x2: l,
        x3: r,
        x4: r,
        y1: b,
        y2: t,
        y3: t,
        y4: b,
    })
