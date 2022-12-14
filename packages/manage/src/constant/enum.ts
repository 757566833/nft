
/**
 * 配合breakPoints使用，主要是适配
 * xs: 0   0-600通常是电话 推荐列为4
 * sm:600  600-900 通常是平板电脑 推荐列为8
 * md:900  900-1200 通常是横向平板电脑 推荐列为12
 * lg:1200 1200-1536 通常是笔记本电脑 推荐列12
 * xl:1536 1536+ 通常是pc 推荐列为12
 * 详情 https://material.io/design/layout/responsive-layout-grid.html#breakpoints
 */
export enum ENUM_BREAK_POINTS{
    XS='xs',
    SM='sm',
    MD='md',
    LG="lg",
    XL='xl'
}
