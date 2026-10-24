"use strict";(()=>{var e={};e.id=788,e.ids=[788],e.modules={5890:e=>{e.exports=require("better-sqlite3")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8893:e=>{e.exports=require("buffer")},4770:e=>{e.exports=require("crypto")},2048:e=>{e.exports=require("fs")},5315:e=>{e.exports=require("path")},6162:e=>{e.exports=require("stream")},1764:e=>{e.exports=require("util")},9678:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>x,patchFetch:()=>C,requestAsyncStorage:()=>h,routeModule:()=>l,serverHooks:()=>E,staticGenerationAsyncStorage:()=>m});var s={};t.r(s),t.d(s,{GET:()=>d,PUT:()=>c});var o=t(9303),a=t(8716),n=t(670),u=t(7070),i=t(5748),p=t(5456);async function d(e){try{let r=(0,p.Ge)(e);if(!r)return u.NextResponse.json({error:"Unauthorized"},{status:401});let t=i.Z.prepare(`
      SELECT id, name, email, role, phone, address, city, district, created_at
      FROM users WHERE id = ?
    `).get(r.userId);if(!t)return u.NextResponse.json({error:"User not found"},{status:404});return u.NextResponse.json({user:t})}catch(e){return console.error("Auth check error:",e),u.NextResponse.json({error:"Internal server error"},{status:500})}}async function c(e){try{let r=(0,p.Ge)(e);if(!r)return u.NextResponse.json({error:"Unauthorized"},{status:401});let{name:t,phone:s,address:o,city:a,district:n}=await e.json();i.Z.prepare(`
      UPDATE users
      SET name = COALESCE(?, name),
          phone = COALESCE(?, phone),
          address = COALESCE(?, address),
          city = COALESCE(?, city),
          district = COALESCE(?, district)
      WHERE id = ?
    `).run(t,s,o,a,n,r.userId);let d=i.Z.prepare(`
      SELECT id, name, email, role, phone, address, city, district, created_at
      FROM users WHERE id = ?
    `).get(r.userId);return u.NextResponse.json({message:"Profile updated successfully",user:d})}catch(e){return console.error("Profile update error:",e),u.NextResponse.json({error:"Internal server error"},{status:500})}}let l=new o.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/auth/me/route",pathname:"/api/auth/me",filename:"route",bundlePath:"app/api/auth/me/route"},resolvedPagePath:"C:\\Users\\G15\\Desktop\\Github\\Git\\My-Practice\\CSS\\Basic CSS\\E Commerce\\src\\app\\api\\auth\\me\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:h,staticGenerationAsyncStorage:m,serverHooks:E}=l,x="/api/auth/me/route";function C(){return(0,n.patchFetch)({serverHooks:E,staticGenerationAsyncStorage:m})}}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[276,86,972,748],()=>t(9678));module.exports=s})();