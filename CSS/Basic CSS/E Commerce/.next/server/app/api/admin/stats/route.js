"use strict";(()=>{var e={};e.id=553,e.ids=[553],e.modules={5890:e=>{e.exports=require("better-sqlite3")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8893:e=>{e.exports=require("buffer")},4770:e=>{e.exports=require("crypto")},2048:e=>{e.exports=require("fs")},5315:e=>{e.exports=require("path")},6162:e=>{e.exports=require("stream")},1764:e=>{e.exports=require("util")},7020:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>C,patchFetch:()=>R,requestAsyncStorage:()=>l,routeModule:()=>c,serverHooks:()=>E,staticGenerationAsyncStorage:()=>m});var s={};r.r(s),r.d(s,{GET:()=>d});var a=r(9303),o=r(8716),u=r(670),n=r(7070),p=r(5748),i=r(5456);async function d(e){try{let t=(0,i.Ge)(e);if(!t||"admin"!==t.role)return n.NextResponse.json({error:"Unauthorized: Admin access required"},{status:403});let r=p.Z.prepare("SELECT COUNT(*) as count FROM orders").get(),s=p.Z.prepare(`
      SELECT COALESCE(SUM(total), 0) as revenue 
      FROM orders 
      WHERE order_status != 'cancelled'
    `).get(),a=p.Z.prepare("SELECT COUNT(*) as count FROM products").get(),o=p.Z.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'customer'").get(),u=p.Z.prepare(`
      SELECT id, order_number, customer_name, customer_email, total, order_status, payment_method, payment_status, created_at
      FROM orders
      ORDER BY created_at DESC
      LIMIT 8
    `).all(),d=p.Z.prepare(`
      SELECT id, name, category_name, price, stock
      FROM products
      WHERE stock <= 10
      ORDER BY stock ASC
      LIMIT 6
    `).all(),c=p.Z.prepare(`
      SELECT order_status, COUNT(*) as count
      FROM orders
      GROUP BY order_status
    `).all();return n.NextResponse.json({stats:{totalRevenue:Number(s.revenue),totalOrders:r.count,totalProducts:a.count,totalCustomers:o.count},recentOrders:u,lowStockProducts:d,ordersByStatus:c})}catch(e){return console.error("Admin stats error:",e),n.NextResponse.json({error:"Failed to fetch admin stats"},{status:500})}}let c=new a.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/admin/stats/route",pathname:"/api/admin/stats",filename:"route",bundlePath:"app/api/admin/stats/route"},resolvedPagePath:"C:\\Users\\G15\\Desktop\\Github\\Git\\My-Practice\\CSS\\Basic CSS\\E Commerce\\src\\app\\api\\admin\\stats\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:l,staticGenerationAsyncStorage:m,serverHooks:E}=c,C="/api/admin/stats/route";function R(){return(0,u.patchFetch)({serverHooks:E,staticGenerationAsyncStorage:m})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[276,86,972,748],()=>r(7020));module.exports=s})();