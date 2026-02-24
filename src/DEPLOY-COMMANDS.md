# 🚀 DEPLOY COMMANDS - Copy & Paste

## ⚡ Quick Deploy (5 Minutes)

### **1. Install Supabase CLI**
```bash
npm install -g supabase
```

### **2. Login**
```bash
supabase login
```

### **3. Link Your Project**
```bash
supabase link --project-ref YOUR_PROJECT_ID
```

Replace `YOUR_PROJECT_ID` with your actual project ID from:
`https://supabase.com/dashboard/project/YOUR_PROJECT_ID`

### **4. Deploy Functions**
```bash
supabase functions deploy
```

### **5. Verify Deployment**
```bash
supabase functions list
```

Should show: `make-server-14f75f49`

### **6. Test It Works**

Open in browser:
```
https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-14f75f49/health
```

Should return:
```json
{"status": "healthy", "message": "Make Server is running"}
```

---

## 🔑 Add OpenAI API Key

### **Option A: Supabase Dashboard (Easiest)**

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click: **Edge Functions** → **Settings** → **Secrets**
4. Add new secret:
   ```
   Name: OPENAI_API_KEY
   Value: sk-proj-...your-key-here...
   ```
5. Click **Save**
6. Wait 2 minutes for changes to apply

### **Option B: Using CLI**

```bash
supabase secrets set OPENAI_API_KEY=sk-proj-...your-key-here...
```

---

## 🎯 Test AI Generation

### **In Your Marketing Dashboard:**

1. Click **Scheduler** tab
2. Click purple **"GENERATE 30 DAYS"** button
3. Wait 5-10 minutes
4. ✅ Done!

### **Or Test via API:**

```bash
curl -X POST \
  https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-14f75f49/ai/generate-calendar \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json"
```

---

## 🔄 Update Functions (After Code Changes)

```bash
supabase functions deploy
```

That's it! Redeploy anytime you update code.

---

## 📊 View Logs

### **CLI:**
```bash
supabase functions logs make-server-14f75f49
```

### **Dashboard:**
1. Go to: https://supabase.com/dashboard
2. Click: **Edge Functions** → `make-server-14f75f49` → **Logs**

---

## 🆘 Troubleshooting Commands

### **Check if function exists:**
```bash
supabase functions list
```

### **Delete and redeploy:**
```bash
supabase functions delete make-server-14f75f49
supabase functions deploy
```

### **View all secrets:**
```bash
supabase secrets list
```

### **Check function status:**
```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-14f75f49/health
```

---

## ✅ You're Deployed When:

- [ ] `supabase functions list` shows `make-server-14f75f49`
- [ ] Health endpoint returns `{"status": "healthy"}`
- [ ] `OPENAI_API_KEY` secret is configured
- [ ] Marketing Dashboard loads without errors
- [ ] "GENERATE 30 DAYS" button works

---

## 🎉 That's It!

**Total Time:** 5-10 minutes

**Now Go Generate 30 Days of Content! 🚀**
