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

// backend/src/routes/creatives.ts

// ... (keep all the existing code for GET / and POST /) ...

// @route   GET /api/creatives/:id/script
// @desc    Generate the injection script for a creative
// @access  Public
authRouter.get('/:id/script', async (req, res) => {
  try {
    const { id } = req.params;
    const { data: creative, error } = await supabase
      .from('creatives')
      .select('content')
      .eq('id', id)
      .single();

    if (error || !creative) {
      return res.status(404).json({ error: 'Creative not found' });
    }

    // --- The Core Script Generation Logic ---
    const injectionScript = `
      (function() {
        // Create a container for the creative
        const frameContainer = document.createElement('div');
        frameContainer.style.position = 'fixed';
        frameContainer.style.top = '0';
        frameContainer.style.left = '0';
        frameContainer.style.width = '100%';
        frameContainer.style.zIndex = '999999';
        frameContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Optional: for a backdrop

        // The creative's HTML content, safely encoded
        const creativeContent = ${JSON.stringify(creative.content)};

        frameContainer.innerHTML = creativeContent;
        
        // Add a close button
        const closeButton = document.createElement('button');
        closeButton.innerText = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '5px';
        closeButton.style.backgroundColor = 'white';
        closeButton.style.border = '1px solid black';
        closeButton.style.borderRadius = '50%';
        closeButton.style.width = '25px';
        closeButton.style.height = '25px';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = function() {
          document.body.removeChild(frameContainer);
        };
        
        frameContainer.appendChild(closeButton);
        
        // Inject the container into the page
        document.body.appendChild(frameContainer);
      })();
    `;

    // Return the script as JavaScript
    res.setHeader('Content-Type', 'application/javascript');
    res.send(injectionScript);

  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    res.status(500).send('Server Error');
  }
});

// ... (your export line is here) ...

export = router;