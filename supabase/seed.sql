-- Seed Categories for RentWork B2B Marketplace
INSERT INTO public.categories (name, slug, description, icon, is_active)
VALUES
  ('Office Furniture', 'office-furniture', 'Commercial office essentials for productive corporate spaces', 'Briefcase', true),
  ('Chairs', 'chairs', 'Ergonomic task chairs, executive seating, and mesh desk chairs', 'Armchair', true),
  ('Tables', 'tables', 'Meeting room tables, board tables, and collaborative lunch benches', 'LayoutGrid', true),
  ('Desks', 'desks', 'Height-adjustable standing desks, linear workstations, and executive desks', 'Table', true),
  ('Electronics', 'electronics', 'Monitors, enterprise projectors, AV display screens, and docking hubs', 'Monitor', true),
  ('Event Equipment', 'event-equipment', 'Temporary furniture and presentation stages for corporate summits and exhibitions', 'Sparkles', true),
  ('Conference Equipment', 'conference-equipment', 'Enterprise audio-visual setups, speaker systems, and video conference bars', 'Video', true),
  ('Storage', 'storage', 'Pedestals, lockable metal filing cabinets, and modular office shelving units', 'Archive', true)
ON CONFLICT (slug) DO NOTHING;
