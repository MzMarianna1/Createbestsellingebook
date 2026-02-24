# 📱 Meta API Quick Setup Guide (Facebook & Instagram)

## 🎯 Get Your Meta Credentials in 10 Minutes

This guide shows you exactly how to get the credentials you need for automated Facebook and Instagram posting.

---

## 🔑 What You Need

1. **META_ACCESS_TOKEN** - Lets you post to Facebook/Instagram
2. **META_PAGE_ID** - Your Facebook Page ID
3. **META_INSTAGRAM_ACCOUNT_ID** - Your Instagram Business Account ID

---

## 📋 Prerequisites

Before you start, make sure you have:

- [✓] A Facebook Page (not personal profile)
- [✓] An Instagram Business account (not personal)
- [✓] Instagram linked to your Facebook Page

**Don't have these?** See "Setup Checklist" at bottom.

---

## 🚀 Step 1: Get Your Access Token (5 minutes)

### **A. Go to Graph API Explorer**

Open this link:
```
https://developers.facebook.com/tools/explorer/
```

### **B. Select Your App**

At the top, you'll see:
```
Meta App: [Dropdown]
```

**If you don't have an app:**
1. Click "Create App" button
2. Choose "Business" type
3. Name it: "Homework Battles Automation"
4. Click "Create App"

### **C. Generate User Access Token**

1. Click **"Generate Access Token"** button
2. Log in with Facebook if prompted
3. You'll see a popup asking for permissions

### **D. Add Permissions**

Click **"Add a Permission"** and select:

- ✅ `pages_show_list` - View your pages
- ✅ `pages_read_engagement` - Read page data
- ✅ `pages_manage_posts` - Create posts
- ✅ `instagram_basic` - Access Instagram account
- ✅ `instagram_content_publish` - Publish to Instagram

Click **"Generate Access Token"** again

### **E. Copy Short-Lived Token**

You'll see a token like:
```
EAABsbCS1iHgBOZCwqE...
```

**Don't save this yet!** We need to exchange it for a long-lived token.

---

## ⏰ Step 2: Exchange for Long-Lived Token (2 minutes)

Short-lived tokens expire in 1 hour. We need a 60-day token.

### **Option A: Use Access Token Tool** (Easiest)

1. Go to: https://developers.facebook.com/tools/accesstoken/
2. Find your User Access Token
3. Click **"Extend Access Token"**
4. Copy the new token ✅

This token lasts **60 days**.

### **Option B: Use API Call** (Advanced)

```bash
curl "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN"
```

**Replace:**
- `YOUR_APP_ID` - Find in app settings
- `YOUR_APP_SECRET` - Find in app settings
- `SHORT_LIVED_TOKEN` - Token from Step 1

**Response:**
```json
{
  "access_token": "EAABsbCS1iHgBO...",
  "token_type": "bearer",
  "expires_in": 5183999
}
```

**Copy `access_token`** ✅

---

## 📄 Step 3: Get Your Facebook Page ID (1 minute)

### **Method 1: From Facebook Page**

1. Go to your Facebook Page
2. Click **"About"** in left menu
3. Scroll down to **"Page transparency"**
4. You'll see **"Page ID"**: `123456789012345`
5. Copy it ✅

### **Method 2: From Graph API Explorer**

1. Go to: https://developers.facebook.com/tools/explorer/
2. In the query box, enter: `me/accounts`
3. Click **"Submit"**
4. You'll see JSON response:
```json
{
  "data": [
    {
      "id": "123456789012345",  ← This is your Page ID
      "name": "Your Page Name"
    }
  ]
}
```
5. Copy the `id` ✅

---

## 📸 Step 4: Get Your Instagram Account ID (2 minutes)

### **Prerequisites:**

Your Instagram must be:
- ✅ Business account (not Personal)
- ✅ Linked to your Facebook Page

**How to link:**
1. Go to Facebook Page settings
2. Click "Instagram" in left menu
3. Click "Connect Account"
4. Log in to Instagram
5. Authorize connection

### **Get the ID:**

1. Go to: https://developers.facebook.com/tools/explorer/
2. Paste your **Access Token** from Step 2
3. In query box, enter: `me/accounts?fields=instagram_business_account`
4. Click **"Submit"**
5. You'll see:
```json
{
  "data": [
    {
      "instagram_business_account": {
        "id": "987654321098765"  ← This is your Instagram ID
      },
      "id": "123456789012345"
    }
  ]
}
```
6. Copy the `instagram_business_account.id` ✅

**Don't see it?** Your Instagram might not be linked. See troubleshooting below.

---

## ✅ Step 5: Add to Your Settings

Now go to **Marketing Command Center → Settings tab**

Paste these values:

| Field | Value | Example |
|-------|-------|---------|
| META_ACCESS_TOKEN | Long-lived token from Step 2 | `EAABsbCS1iHgBO...` |
| META_PAGE_ID | Page ID from Step 3 | `123456789012345` |
| META_INSTAGRAM_ACCOUNT_ID | Instagram ID from Step 4 | `987654321098765` |

Click **"Save Key"** for each one.

Then click **"Test Connection"** to verify! ✅

---

## 🧪 Step 6: Test It!

1. Create a design in Canva
2. Download as PNG
3. Upload to Imgur.com (free)
4. Copy image URL
5. Go to **Scheduler tab**
6. Click **"Schedule Content"** on Day 1
7. Paste image URL in Design ID field
8. Add caption: "Testing my automation! 🚀"
9. Click "Publish Now"
10. Check Facebook and Instagram - your post is live! 🎉

---

## 🆘 Troubleshooting

### **❓ "Invalid OAuth access token"**

**Problem:** Token expired or incorrect

**Solutions:**
- Make sure you copied the FULL token (very long string)
- Check for extra spaces at start/end
- Regenerate a new token
- Make sure it's a long-lived token (60 days)

---

### **❓ "Instagram account not found"**

**Problem:** Instagram not linked to Facebook Page

**Solutions:**
1. Go to Facebook Page Settings
2. Click "Instagram" in left sidebar
3. Click "Connect Account"
4. Log in with Instagram Business account
5. Make sure it's a BUSINESS account, not Personal
6. If Personal, convert to Business in Instagram app:
   - Settings → Account → Switch to Professional Account

---

### **❓ "Permission denied for pages_manage_posts"**

**Problem:** Token doesn't have correct permissions

**Solutions:**
1. Go back to Graph API Explorer
2. Click "Add a Permission"
3. Select all permissions from Step 1D
4. Click "Generate Access Token" again
5. Log in and approve permissions
6. Exchange for long-lived token again

---

### **❓ "Token expires in 1 hour"**

**Problem:** You're using short-lived token

**Solution:**
1. Go to: https://developers.facebook.com/tools/accesstoken/
2. Click "Extend Access Token"
3. Copy the new 60-day token
4. Update in Settings

---

### **❓ "Can't create Facebook app"**

**Problem:** Need business verification

**Solutions:**
- Try "Consumer" app type instead of "Business"
- Or use existing app if you have one
- Or skip app creation and use Graph API Explorer directly

---

## 🔄 Token Renewal (Every 60 Days)

**Important:** Meta access tokens expire after 60 days.

### **Set a Reminder:**

1. Add calendar reminder for 55 days from now
2. Title: "Renew Meta Access Token"
3. Link: This guide

### **When It's Time to Renew:**

1. Go to: https://developers.facebook.com/tools/explorer/
2. Click "Generate Access Token"
3. Log in and approve permissions
4. Go to: https://developers.facebook.com/tools/accesstoken/
5. Click "Extend Access Token"
6. Copy new token
7. Update in Settings tab
8. Test connection ✅

**Takes 2 minutes every 60 days!**

---

## 📋 Quick Setup Checklist

### **Prerequisites:**
- [ ] Have a Facebook Page (create at facebook.com/pages/create)
- [ ] Have Instagram Business account (convert in IG app settings)
- [ ] Instagram linked to Facebook Page (Page Settings → Instagram)

### **Setup Steps:**
- [ ] Go to Graph API Explorer
- [ ] Generate access token with permissions
- [ ] Extend to 60-day token
- [ ] Get Facebook Page ID
- [ ] Get Instagram Account ID
- [ ] Add all 3 values to Settings
- [ ] Test connection
- [ ] Try publishing a test post ✅

**Total time: 10 minutes**

---

## 🎯 What You Can Do Now

Once Meta API is set up:

✅ **Auto-post to Facebook Page**
- Schedule posts in advance
- Publish with one click
- No manual Facebook posting

✅ **Auto-post to Instagram**
- Create feed posts automatically
- Include captions and hashtags
- Cross-post same content

✅ **Track Performance**
- See post engagement
- Monitor click-through rates
- Optimize content strategy

✅ **Save Time**
- 90% less manual work
- Consistent posting schedule
- Never forget to post

---

## 💡 Pro Tips

### **1. Test with a Test Post First**

Before scheduling your campaign:
- Create a simple test image
- Try "Publish Now" with test content
- Verify it appears on both Facebook and Instagram
- Delete test posts
- Then start your real campaign ✅

### **2. Use Hashtags**

For Instagram, add hashtags to captions:
```
Your caption here...

#homeworkhelp #parenting #education #learningkingdom
```

Boosts discoverability!

### **3. Post at Peak Times**

Research shows best times to post:
- **Facebook:** 1-4 PM on weekdays
- **Instagram:** 11 AM - 2 PM on weekdays

Set your scheduler accordingly!

### **4. Keep Tokens Fresh**

- Set 55-day calendar reminder
- Renew before expiration
- No downtime in posting!

---

## 🚀 Next Steps

**You now have Meta API set up!**

1. ✅ Test with one post
2. ✅ Create 7 Canva designs
3. ✅ Schedule all 7 in dashboard
4. ✅ Enable automation
5. ✅ Watch your content post automatically! 🎉

**See:** [START-HERE.md](START-HERE.md) for complete workflow

---

## 📚 Additional Resources

- **Meta Graph API Docs:** https://developers.facebook.com/docs/graph-api
- **Instagram API Docs:** https://developers.facebook.com/docs/instagram-api
- **Access Token Tool:** https://developers.facebook.com/tools/accesstoken/
- **Graph API Explorer:** https://developers.facebook.com/tools/explorer/

---

## ✅ Summary

**What you need:**
1. META_ACCESS_TOKEN (60-day token)
2. META_PAGE_ID (Facebook Page ID)
3. META_INSTAGRAM_ACCOUNT_ID (Instagram Business ID)

**Where to get them:**
1. Graph API Explorer + Token Tool
2. Facebook Page → About
3. Graph API: me/accounts?fields=instagram_business_account

**Time:** 10 minutes setup, 2 minutes every 60 days to renew

**Benefit:** Never manually post to Facebook/Instagram again! 🎉

---

**Ready to post?** Go to Marketing Command Center → Settings → Add your credentials! 🚀
