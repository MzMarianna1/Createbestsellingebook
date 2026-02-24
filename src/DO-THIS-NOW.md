# 🎯 TO DEPLOY: DO THIS NOW

## ⚡ 15-MINUTE DEPLOYMENT

### **STEP 1: Deploy Backend (5 min)**

```bash
# Install CLI
npm install -g supabase

# Login
supabase login

# Link project (get YOUR_PROJECT_ID from Supabase dashboard URL)
supabase link --project-ref YOUR_PROJECT_ID

# Deploy
supabase functions deploy

# Verify (should show: make-server-14f75f49)
supabase functions list
```

---

### **STEP 2: Add OpenAI Key (2 min)**

1. Go to: https://platform.openai.com/api-keys
2. Create new key
3. Go to: https://supabase.com/dashboard → Your Project → **Edge Functions** → **Settings** → **Secrets**
4. Add:
   ```
   Name: OPENAI_API_KEY
   Value: sk-proj-...your-key...
   ```
5. Click **Save**
6. Wait 2 minutes

---

### **STEP 3: Test It Works (2 min)**

Open in browser:
```
https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-14f75f49/health
```

Should see:
```json
{"status": "healthy", "message": "Make Server is running"}
```

---

### **STEP 4: Generate Content (5 min)**

1. Open your Marketing Dashboard (the Figma Make app)
2. Click **Scheduler** tab
3. Click purple **"GENERATE 30 DAYS"** button
4. Wait 5-10 minutes
5. ✅ **30 days of AI content ready!**

---

## 🎉 YOU'RE DEPLOYED!

Now you can:
- ✅ Generate 30 days of story-driven content in 10 minutes
- ✅ Create designs in Canva using AI visual prompts
- ✅ Schedule posts
- ✅ Enable automation
- ✅ Scale to $1M!

---

## 📚 Full Guides

- **[DEPLOY-COMMANDS.md](DEPLOY-COMMANDS.md)** - Copy/paste commands
- **[DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md)** - Detailed walkthrough
- **[STORYTELLING-CONTENT-GUIDE.md](STORYTELLING-CONTENT-GUIDE.md)** - Content framework
- **[README-AUTOMATION.md](README-AUTOMATION.md)** - Complete automation system

---

## 🆘 Stuck?

**"Function not found"**
→ Run: `supabase functions deploy`

**"OPENAI_API_KEY not configured"**
→ Add to Supabase secrets, wait 2 min

**"Generation slow"**
→ Normal (8-10 min for 30 posts)

---

## 🚀 WHAT ARE YOU WAITING FOR?

**Copy the commands above. Paste. Deploy. GO! 💪🔥**
