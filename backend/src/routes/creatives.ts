// backend/src/routes/creatives.ts
console.log('--- Creatives Route File Loaded ---'); // <-- ADD THIS LINE


import { Router } from 'express';
import { supabase } from '../config/supabase';
import { protect } from '../middleware/auth';

const router = Router();

// @route   GET /api/creatives
// @desc    Get all creatives for a user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { data: creatives, error } = await supabase
      .from('creatives')
      .select('*')
      .eq('user_id', req.user!.userId);

    if (error) {
      throw error;
    }

    res.json(creatives);
// New, corrected code
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error('An unknown error occurred:', err);
  }
  res.status(500).send('Server Error');
}
});

// @route   POST /api/creatives
// @desc    Create a new creative
// @access  Private
router.post('/', protect, async (req, res) => {
  const { name, content, width = 1, height = 1 } = req.body;

  if (!name || !content) {
    return res.status(400).json({ error: 'Name and content are required' });
  }

  try {
    const { data: newCreative, error } = await supabase
      .from('creatives')
      .insert([
        {
          name,
          content,
          width,
          height,
          user_id: req.user!.userId,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json(newCreative);
// New, corrected code
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error('An unknown error occurred:', err);
  }
  res.status(500).send('Server Error');
}
});

export default router;