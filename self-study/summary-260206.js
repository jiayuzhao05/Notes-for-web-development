//Catch-all [...slug] 必须有子路径 
// app/products/[...categories]/page.tsx

// ✅ /products/electronics/laptop
// ✅ /products/clothing/shirts
// ❌ /products (404，没有分类就不显示)
/*URL: /docs/guide/getting-started/installation

segments 捕获:
└─ guide             → slug[0]
└─ getting-started   → slug[1]  
└─ installation      → slug[2]

params = { slug: ['guide', 'getting-started', 'installation'] }
*/

//Optional Catch-all [[...slug]] 根路径也需要显示内容
// app/shop/[[...slug]]/page.tsx

// ✅ /shop (显示所有商品)
// ✅ /shop/electronics (显示电子产品)
// ✅ /shop/electronics/laptop (显示笔记本)

//动态segments 作为params属性 传递给layout,page,route,generateMetadata函数
// children：React 中，组件标签之间的内容