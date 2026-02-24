# 🎨 How to Get Your Canva API Credentials

## ⚠️ IMPORTANT: Canva Uses OAuth, Not a Simple API Key

Canva doesn't have a single "API key" - it uses **OAuth authentication** with a Client ID and Client Secret.

---

## 🔑 What You Need

For automated design exports, you need:

1. **Canva Client ID**
2. **Canva Client Secret**

---

## 📍 Step-by-Step: Finding Your Credentials

### **Step 1: Go to Your Canva App**

Open this link in a new tab:
```
https://www.canva.com/developers/apps/AAHAAFRb5g8
```

This is YOUR Canva app that you've already created.

---

### **Step 2: Click "Authentication" Tab**

On the left sidebar, you'll see:
- Overview
- **Authentication** ← Click this
- Configuration
- Publish

---

### **Step 3: Find Your Credentials**

You'll see two important fields:

#### **A. Client ID**
```
Location: Authentication tab → "OAuth credentials" section
Label: "Client ID"
Format: Long alphanumeric string
Example: OC-AZ123abc456DEF789ghi
```

**Click "Copy"** and paste into Settings → `CANVA_CLIENT_ID`

#### **B. Client Secret**
```
Location: Authentication tab → "OAuth credentials" section  
Label: "Client secret"
Format: Long alphanumeric string
Example: 1a2b3c4d5e6f7g8h9i0j
```

**Click "Show"** → **Click "Copy"** and paste into Settings → `CANVA_CLIENT_SECRET`

---

## ⚠️ If You Don't See "Authentication" Tab

This means your app might not have OAuth enabled. Here's how to fix it:

### **Option 1: Enable OAuth** (Recommended)

1. Go to your app: https://www.canva.com/developers/apps/AAHAAFRb5g8
2. Click **"Configuration"** tab
3. Scroll to **"Authentication"**
4. Enable **"OAuth 2.0"**
5. Click **"Save"**
6. Now go to **"Authentication"** tab
7. You'll see Client ID and Client Secret ✅

---

### **Option 2: Use Canva Connect API** (Alternative)

If you want simpler authentication, use Canva's Connect API:

1. Go to: https://www.canva.com/developers/docs/connect-api/getting-started/
2. Create a **Connect API** app instead
3. This gives you a simpler **API Token**
4. Use this token for exports

**Note:** This requires different API endpoints. Let me know if you want to go this route.

---

## 🎯 Quick Visual Guide

```
1. Open: https://www.canva.com/developers/apps/AAHAAFRb5g8

2. Left Sidebar:
   [ ] Overview
   [✓] Authentication  ← CLICK HERE
   [ ] Configuration
   [ ] Publish

3. On Authentication Page:
   
   OAuth Credentials
   ─────────────────────────────────────
   Client ID: OC-AZ123abc456...  [Copy]
   Client secret: *********** [Show] [Copy]
   ─────────────────────────────────────

4. Copy both values

5. Go to Marketing Command Center → Settings tab

6. Paste:
   - Client ID → CANVA_CLIENT_ID field
   - Client Secret → CANVA_CLIENT_SECRET field

7. Click "Save Key" for each ✅
```

---

## 🔄 Alternative: Simplified Setup (No OAuth)

If Canva OAuth is too complex, here's a simpler approach:

### **Manual Export Workflow:**

Instead of automated Canva API:

1. **Create designs in Canva** (as normal)
2. **Download as PNG** (manually)
3. **Upload to your server** (or use direct URL)
4. **Use scheduler to auto-post** to social media

This skips the Canva API entirely but still automates social posting!

---

## 🎨 Recommended: Start Simple

Here's what I recommend:

### **Phase 1: Manual Canva, Auto Social** (Week 1)
- Create designs in Canva
- Download PNG files
- Upload to image hosting (Imgur, Cloudinary)
- Use scheduler with direct image URLs
- Auto-publish to Facebook/Instagram/Pinterest

**Setup time:** 5 minutes  
**Effort:** 2 min/post to download + get URL

### **Phase 2: Full Automation** (Week 2+)
- Set up OAuth credentials
- Connect Canva API
- Fully automated export + publish
- Zero manual work

**Setup time:** 30 minutes  
**Effort:** 0 min/post

---

## 🆘 Still Can't Find It?

### **Troubleshooting Checklist:**

❓ **Don't see "Authentication" tab?**
→ Your app might not support OAuth. Try creating a new app:
- Go to: https://www.canva.com/developers/apps
- Click "Create app"
- Choose "App with extensions and integrations"
- Enable OAuth in settings

❓ **App says "Not published"?**
→ That's OK! You can use it in development mode
→ OAuth credentials work even for unpublished apps

❓ **Don't have access to developer portal?**
→ Make sure you're logged into Canva
→ Verify your account has developer access
→ Join: https://www.canva.com/developers/

❓ **Want to skip Canva API entirely?**
→ Use the manual export workflow above
→ Still saves 90% of time with social media automation!

---

## 💡 Recommended Next Steps

### **Option A: Use Canva OAuth** (Most Powerful)
✅ Fully automated  
✅ No manual downloads  
❌ More complex setup (30 min)

**Do this if:** You want 100% automation

### **Option B: Manual Canva + Auto Social** (Simplest)
✅ Easy setup (5 min)  
✅ Still saves tons of time  
❌ Need to download PNGs manually  

**Do this if:** You want to start TODAY

### **Option C: Skip Social Automation for Now**
✅ No APIs needed  
✅ Post manually to test content  
❌ Most time-consuming  

**Do this if:** You're still testing content strategy

---

## 🎯 My Recommendation

**Start with Option B (Manual Canva + Auto Social):**

1. Create Day 1 design in Canva (15 min)
2. Download as PNG
3. Upload to Imgur.com (free, 1 min)
4. Copy image URL
5. Go to Scheduler → Paste URL instead of Design ID
6. Click "Publish Now"
7. Watch it auto-post to Facebook/Instagram! ✅

**Then later:** Set up OAuth for full automation

---

## 📋 Updated Setup Checklist

**For Simplified Workflow (No Canva API):**

- [ ] Skip CANVA_CLIENT_ID (not needed yet)
- [ ] Skip CANVA_CLIENT_SECRET (not needed yet)
- [✓] Add META_ACCESS_TOKEN (REQUIRED)
- [✓] Add META_PAGE_ID (REQUIRED)
- [✓] Add META_INSTAGRAM_ACCOUNT_ID (REQUIRED)
- [ ] Add PINTEREST_ACCESS_TOKEN (optional)

**This gives you 90% of the automation benefits with 10% of the setup hassle!**

---

## 🚀 Quick Win Action Plan

**Next 15 minutes:**

1. ✅ Skip Canva API for now
2. ✅ Get Meta access token (see below)
3. ✅ Add Meta credentials to Settings
4. ✅ Create one design in Canva
5. ✅ Download PNG
6. ✅ Upload to Imgur
7. ✅ Test publish to Facebook! 🎉

**See:** META-API-QUICK-SETUP.md for Meta credentials (I'll create this next!)

---

## 🎉 Bottom Line

**You have 3 choices:**

1. **Full automation** = Set up Canva OAuth (30 min setup)
2. **90% automation** = Skip Canva API, use URLs (5 min setup) ⭐ **START HERE**
3. **Manual for now** = Test content first, automate later

**I recommend #2 to get started TODAY!**

Want me to create a guide for the simplified workflow? Just say "show me the simple way" and I'll walk you through it! 🚀
