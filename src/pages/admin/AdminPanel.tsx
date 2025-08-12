import React, { useMemo, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Admin panel that adjusts the last Services ScrollStack item using data attributes
// Exposes scale, rotation, blur, color styling, and spacing controls.

const AdminPanel: React.FC = () => {
  const lastCard = useMemo(() => {
    return document.querySelector('#services .scroll-stack-card:last-of-type') as HTMLElement | null;
  }, []);

  const [enabled, setEnabled] = useState(true);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [blur, setBlur] = useState<number>(0);
  const [marginBottom, setMarginBottom] = useState<number>(30);

  const apply = (el: HTMLElement | null, attr: string, value: string) => {
    if (!el) return;
    el.setAttribute(attr, value);
  };

  const applyStyle = (el: HTMLElement | null, prop: string, value: string) => {
    if (!el) return;
    (el.style as any)[prop] = value;
  };

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    if (!lastCard) return;
    if (!checked) {
      lastCard.removeAttribute('data-scale-adjust');
      lastCard.removeAttribute('data-rotation-adjust');
      lastCard.removeAttribute('data-blur-adjust');
      (lastCard.style as any).marginBottom = '';
    } else {
      apply(lastCard, 'data-scale-adjust', String(scale));
      apply(lastCard, 'data-rotation-adjust', String(rotation));
      apply(lastCard, 'data-blur-adjust', String(blur));
      applyStyle(lastCard, 'marginBottom', `${marginBottom}px`);
    }
  };

  const onScale = (v: number[]) => {
    const val = v[0] ?? 1;
    setScale(val);
    if (enabled) apply(lastCard, 'data-scale-adjust', String(val));
  };

  const onRotation = (v: number[]) => {
    const val = v[0] ?? 0;
    setRotation(val);
    if (enabled) apply(lastCard, 'data-rotation-adjust', String(val));
  };

  const onBlur = (v: number[]) => {
    const val = v[0] ?? 0;
    setBlur(val);
    if (enabled) apply(lastCard, 'data-blur-adjust', String(val));
  };

  const onSpacing = (v: number[]) => {
    const val = v[0] ?? 30;
    setMarginBottom(val);
    if (enabled) applyStyle(lastCard, 'marginBottom', `${val}px`);
  };

  return (
    <section className="section-light py-6 border-b border-brand-gray-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Services Stack Tuning</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="motion" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Switch id="admin-enable" checked={enabled} onCheckedChange={handleToggle} />
                  <Label htmlFor="admin-enable">Enable live tuning for last service card</Label>
                </div>
              </div>
              <TabsList>
                <TabsTrigger value="motion">Motion</TabsTrigger>
                <TabsTrigger value="styling">Styling</TabsTrigger>
              </TabsList>

              <TabsContent value="motion" className="mt-4 space-y-6">
                <div>
                  <Label className="mb-2 block">Scale multiplier ({scale.toFixed(2)})</Label>
                  <Slider min={0.8} max={1.2} step={0.01} value={[scale]} onValueChange={onScale} />
                </div>
                <div>
                  <Label className="mb-2 block">Rotation adjust (deg) ({rotation.toFixed(0)})</Label>
                  <Slider min={-10} max={10} step={1} value={[rotation]} onValueChange={onRotation} />
                </div>
                <div>
                  <Label className="mb-2 block">Blur adjust (px) ({blur.toFixed(0)})</Label>
                  <Slider min={0} max={8} step={1} value={[blur]} onValueChange={onBlur} />
                </div>
              </TabsContent>

              <TabsContent value="styling" className="mt-4 space-y-6">
                <div>
                  <Label className="mb-2 block">Bottom spacing (px) ({marginBottom.toFixed(0)})</Label>
                  <Slider min={0} max={120} step={2} value={[marginBottom]} onValueChange={onSpacing} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminPanel;


