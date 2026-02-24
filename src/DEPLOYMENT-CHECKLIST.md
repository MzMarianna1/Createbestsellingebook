# 🚀 DEPLOYMENT CHECKLIST

## ⚡ Quick Overview

Your AI content system needs:
1. ✅ Supabase Edge Functions deployed
2. ✅ API keys configured as secrets
3. ✅ Frontend already works (it's a Figma Make app)
4. ✅ Test the system
5. ✅ Start generating content!

**Time Required:** 15-20 minutes

---

## 📋 Step-by-Step Deployment

### **STEP 1: Deploy Supabase Edge Functions (5 min)**

Your backend server code needs to be deployed to Supabase.

#### **Option A: Using Supabase CLI (Recommended)**

1. **Install Supabase CLI** (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase:**
   ```bash
   supabase login
   ```

3. **Link to your project:**
   ```bash
   supabase link --project-ref YOUR_PROJECT_ID
   ```
   
   Get your project ID from: `https://supabase.com/dashboard/project/YOUR_PROJECT_ID`

4. **Deploy all functions:**
   ```bash
   supabase functions deploy
   ```

   This deploys all functions in `/supabase/functions/` including:
   - `make-server-14f75f49` (main server)

5. **Verify deployment:**
   ```bash
   supabase functions list
   ```
   
   You should see `make-server-14f75f49` listed as deployed.

#### **Option B: Using Supabase Dashboard (Manual)**

1. Go to your Supabase Dashboard
2. Click **Edge Functions** → **Deploy new function**
3. Name: `make-server-14f75f49`
4. Copy/paste code from `/supabase/functions/server/index.tsx`
5. Click **Deploy**

⚠️ **Important:** Option B requires manual updates. Option A is better for ongoing changes.

---

### **STEP 2: Configure API Keys (5 min)**

Your system needs these API keys configured as Supabase secrets:

#### **Required Keys:**

##### **1. OpenAI API Key** (REQUIRED for AI content generation)

1. Get your key: https://platform.openai.com/api-keys
2. Go to Supabase Dashboard → **Edge Functions** → **Settings**
3. Scroll to **Secrets**
4. Add new secret:
   ```
   Name: OPENAI_API_KEY
   Value: sk-proj-...your-key-here...
   ```
5. Click **Save**

**Cost:** ~$2-3/month for 30 days of content

##### **2. Canva API Keys** (OPTIONAL - for automated design generation)

Skip this if you want to create designs manually in Canva.

If you want automated design generation:

1. Get API keys: https://www.canva.com/developers/
2. Add to Supabase secrets:
   ```
   Name: CANVA_CLIENT_ID
   Value: your-client-id
   
   Name: CANVA_CLIENT_SECRET
   Value: your-client-secret
   ```

##### **3. Already Configured** (You mentioned these are done):

✅ SUPABASE_URL  
✅ SUPABASE_ANON_KEY  
✅ SUPABASE_SERVICE_ROLE_KEY  
✅ SUPABASE_DB_URL  
✅ STRIPE_WEBHOOK_SECRET  
✅ STRIPE_SECRET_KEY  
✅ RESEND_API_KEY  

---

### **STEP 3: Verify Deployment (2 min)**

Test that your Edge Function is working:

1. **Test the health endpoint:**
   
   Open in browser:
   ```
   https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-14f75f49/health
   ```
   
   Should return:
   ```json
   {
     "status": "healthy",
     "message": "Make Server is running"
   }
   ```

2. **If you get an error:**
   - Check Edge Function logs in Supabase Dashboard
   - Verify function is deployed: `supabase functions list`
   - Check secrets are configured correctly

---

### **STEP 4: Test AI Content Generation (5 min)**

1. **Open your Marketing Dashboard** (the Figma Make app)

2. **Go to Scheduler tab**

3. **Click purple "GENERATE 30 DAYS" button**

4. **Wait 5-10 minutes** (AI is generating 30 days of content)

5. **Check for errors:**
   - If it says "OPENAI_API_KEY not configured" → Go back to Step 2
   - If it times out → Normal for first run, check Supabase logs
   - If it succeeds → 🎉 YOU'RE DEPLOYED!

---

### **STEP 5: Create Your First Content (5 min)**

1. **Review generated content** in Marketing Dashboard → Scheduler

2. **Pick Day 1** (should be something like "3 Signs Homework is Traumatizing Your Child")

3. **Create the design:**
   - Option A: Use Canva with the visual prompt provided
   - Option B: Use stock photo overlay style (see OVERLAY-STYLE-GUIDE.md)

4. **Schedule the post:**
   - Add Design ID (from Canva URL)
   - Set post time
   - Click "Schedule Content"

5. **Test publish:**
   - Click "Publish Now"
   - Verify it posts to your social media
   - 🎉 SUCCESS!

---

## 🔧 Troubleshooting

### **"Function not found" error**

**Fix:** Deploy the function:
```bash
supabase functions deploy make-server-14f75f49
```

---

### **"OPENAI_API_KEY not configured"**

**Fix:** Add to Supabase Edge Function Secrets (see Step 2)

Wait 2 minutes after adding secrets, then try again.

---

### **"Generation takes forever"**

**Normal:** First generation takes 8-10 minutes (AI is creating 30 posts)

**Check progress:** Supabase Dashboard → Edge Functions → Logs

---

### **"CORS error"**

**Fix:** Already configured in the server code. If you see this:
1. Check that server is deployed
2. Verify you're using the correct API_BASE URL
3. Check Edge Function logs

---

### **"Design export failed"**

**Cause:** Canva API not configured OR Design ID is wrong

**Fix:**
- If using Canva API: Add CANVA_CLIENT_ID and CANVA_CLIENT_SECRET
- If manual: Make sure Design ID format is correct (e.g., DAGQx1234567)

---

## 🎯 Quick Reference

### **Your Edge Function URL:**
```
https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-14f75f49
```

### **Key Endpoints:**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Check if server is running |
| `/ai/generate-calendar` | POST | Generate 30 days of content |
| `/ai/generate-single` | POST | Generate single day content |
| `/content/schedule` | GET | Get scheduled content |
| `/content/schedule` | POST | Schedule new content |
| `/canva/export-and-publish` | POST | Export design & publish to social |

### **Required Secrets:**

| Secret Name | Required? | Where to Get |
|-------------|-----------|--------------|
| `OPENAI_API_KEY` | ✅ YES | https://platform.openai.com/api-keys |
| `CANVA_CLIENT_ID` | ⚪ Optional | https://www.canva.com/developers/ |
| `CANVA_CLIENT_SECRET` | ⚪ Optional | https://www.canva.com/developers/ |
| `SUPABASE_URL` | ✅ Already done | - |
| `SUPABASE_ANON_KEY` | ✅ Already done | - |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Already done | - |
| `RESEND_API_KEY` | ✅ Already done | - |

---

## ✅ Deployment Complete Checklist

Before you start generating content, verify:

- [ ] Supabase Edge Function deployed (`supabase functions list` shows it)
- [ ] OPENAI_API_KEY configured in Supabase secrets
- [ ] Health endpoint returns `{"status": "healthy"}`
- [ ] Marketing Dashboard loads without errors
- [ ] "GENERATE 30 DAYS" button is visible
- [ ] Brand guidelines exist at `/brand-guidelines.json`
- [ ] You have $5+ in OpenAI account for API usage

---

## 🚀 You're Ready!

Once all checkboxes are ✅, you're DEPLOYED and ready to:

1. **Generate 30 days of content** (Click the purple button)
2. **Review & edit** (Content is 90% perfect already)
3. **Create designs** (Canva or overlay style)
4. **Schedule posts** (Set times)
5. **Enable automation** (Let it run on autopilot)
6. **Scale to $1M!** 📈🔥

---

## 📞 Need Help?

### **Check Logs:**
Supabase Dashboard → Edge Functions → `make-server-14f75f49` → Logs

### **Common Issues:**
- API key not working? Wait 2 min after adding to secrets
- Function not found? Redeploy: `supabase functions deploy`
- Generation slow? Normal for first run (8-10 min)

---

## 🎉 Next Steps After Deployment

1. ✅ Generate your first 30 days
2. ✅ Review Day 1-3 content
3. ✅ Create first 3 designs
4. ✅ Schedule Week 1
5. ✅ Test publish to social media
6. ✅ Enable automation
7. ✅ Watch engagement grow
8. ✅ Regenerate Month 2
9. ✅ Scale to $1M! 💰

---

**You're 15 minutes away from a fully automated AI content system! Let's GO! 🚀✨**
