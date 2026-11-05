import { useState } from 'react';
import { Image, ScrollView, TextInput, View } from 'react-native';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { images } from '@/constants/images';

const colorSwatches = [
  ['Orange', 'bg-orange'],
  ['Orange Dark', 'bg-orange-dark'],
  ['Orange Light', 'bg-orange-light'],
  ['Navy', 'bg-navy'],
  ['Navy Light', 'bg-navy-light'],
  ['Success', 'bg-success'],
  ['Warning', 'bg-warning'],
  ['Error', 'bg-error'],
  ['Info', 'bg-info'],
] as const;

const statusSwatches = [
  ['Success Light', 'bg-success-light', 'text-success'],
  ['Warning Light', 'bg-warning-light', 'text-warning'],
  ['Error Light', 'bg-error-light', 'text-error'],
  ['Info Light', 'bg-info-light', 'text-info'],
  ['Neutral', 'bg-border', 'text-text-secondary'],
] as const;

const leadStages = ['ใหม่', 'คัดกรองแล้ว', 'ติดต่อแล้ว', 'นัดหมาย', 'เสนอราคา', 'ชนะ', 'ปิด'] as const;
const stageChips = ['chip-info', 'chip-warning', 'chip-orange', 'chip-warning', 'chip-orange', 'chip-success', 'chip-neutral'] as const;

export function DesignSystemPreview() {
  const [message, setMessage] = useState('ตัวอย่างองค์ประกอบ UI เท่านั้น');
  return (
    <ScrollView className="screen" contentInsetAdjustmentBehavior="automatic">
      <View className="screen-content">

        {/* Hero banner */}
        <View className="hero-banner gap-2">
          <AppText variant="h1">มีทัก</AppText>
          <AppText className="font-poppins-semi-bold text-navy">Mee Tuck Insurance Platform</AppText>
          <AppText>ระบบการออกแบบ · Design System</AppText>
          <AppText variant="caption">ตัวอย่างธีม ไม่ใช่หน้าบริการประกันภัยที่เปิดใช้งานจริง</AppText>
        </View>

        {/* Color palette — primaries */}
        <View className="card gap-4">
          <AppText variant="h2">สีหลัก</AppText>
          <View className="flex-row flex-wrap gap-4">
            {colorSwatches.map(([label, color]) => (
              <View key={label} className="gap-2">
                <View className={`h-12 w-20 rounded-md ${color}`} />
                <AppText variant="caption">{label}</AppText>
              </View>
            ))}
          </View>
        </View>

        {/* Status chips */}
        <View className="card gap-4">
          <AppText variant="h2">สีสถานะ</AppText>
          <View className="flex-row flex-wrap gap-3">
            {statusSwatches.map(([label, bg, text]) => (
              <View key={label} className={`chip ${bg} px-3 py-1`}>
                <AppText variant="caption" className={text}>{label}</AppText>
              </View>
            ))}
          </View>
        </View>

        {/* Lead stage chips */}
        <View className="card gap-3">
          <AppText variant="h2">สถานะ Lead</AppText>
          <View className="flex-row flex-wrap gap-2">
            {leadStages.map((stage, i) => (
              <View key={stage} className={`chip ${stageChips[i]} px-3 py-1`}>
                <AppText variant="caption">{stage}</AppText>
              </View>
            ))}
          </View>
        </View>

        {/* Typography */}
        <View className="card gap-3">
          <AppText variant="h1">ดูแลวันนี้ เพื่ออนาคต</AppText>
          <AppText variant="h2">เลือกความคุ้มครองที่เข้าใจ</AppText>
          <AppText variant="h3">หัวข้อรอง ภาษาไทย</AppText>
          <AppText variant="h4">ข้อความเน้นและหัวข้อย่อย</AppText>
          <AppText>Prompt · ภาษาไทยที่อ่านง่าย พร้อมรองรับขนาดตัวอักษรของอุปกรณ์</AppText>
          <AppText className="font-poppins-regular">Poppins · Insurance made simple · 0123456789</AppText>
          <AppText variant="caption">ข้อความประกอบ · เอกสารและเงื่อนไข</AppText>
        </View>

        {/* Buttons & form */}
        <View className="card gap-3">
          <AppText variant="h2">ปุ่มและสถานะ</AppText>
          <Button title="ปุ่มหลัก" onPress={() => setMessage('ทดสอบปุ่มหลักเรียบร้อยแล้ว')} />
          <Button title="ปุ่มรอง" variant="secondary" onPress={() => setMessage('ทดสอบปุ่มรองเรียบร้อยแล้ว')} />
          <Button title="ปุ่มเส้นขอบ" variant="outline" onPress={() => setMessage('ทดสอบปุ่มเส้นขอบเรียบร้อยแล้ว')} />
          <Button title="ไม่พร้อมใช้งาน" disabled />
          <Button title="กำลังดำเนินการ" loading />
          <AppText accessibilityLiveRegion="polite">{message}</AppText>
          <TextInput
            className="field"
            accessibilityLabel="ช่องกรอกข้อมูลตัวอย่าง"
            placeholder="ข้อความตัวอย่าง"
          />
          <View className="badge">
            <AppText variant="caption" className="text-navy">ตัวอย่างสถานะ</AppText>
          </View>
        </View>

        {/* KPI tiles */}
        <View className="card gap-3">
          <AppText variant="h2">KPI / เมตริก</AppText>
          <View className="flex-row gap-3">
            <View className="kpi-card gap-1">
              <AppText className="kpi-value">320</AppText>
              <AppText className="kpi-label">Lead ทั้งหมด</AppText>
            </View>
            <View className="kpi-card gap-1">
              <AppText className="kpi-value">45</AppText>
              <AppText className="kpi-label">ปิดการขาย</AppText>
            </View>
            <View className="kpi-card gap-1">
              <AppText className="kpi-value">60%</AppText>
              <AppText className="kpi-label">อัตราแปลง</AppText>
            </View>
          </View>
        </View>

        {/* Avatar sizes */}
        <View className="card gap-3">
          <AppText variant="h2">Avatar</AppText>
          <View className="flex-row items-end gap-4">
            <View className="avatar-sm avatar-placeholder">
              <AppText variant="caption" className="text-orange font-prompt-bold">ก</AppText>
            </View>
            <View className="avatar-md avatar-placeholder">
              <AppText className="text-orange font-prompt-bold">ก</AppText>
            </View>
            <View className="avatar-lg avatar-placeholder">
              <AppText variant="h4" className="text-orange">ก</AppText>
            </View>
            <View className="avatar-xl avatar-placeholder">
              <AppText variant="h3" className="text-orange">ก</AppText>
            </View>
          </View>
        </View>

        {/* List items */}
        <View className="card gap-1">
          <AppText variant="h2" className="mb-2">รายการ Lead</AppText>
          {['สมชาย รักดี', 'มาลี ใจดี', 'วิชัย สุขสม'].map((name, i) => (
            <View key={name}>
              <View className="list-item">
                <View className="avatar-md avatar-placeholder">
                  <AppText className="text-orange font-prompt-bold">{name[0]}</AppText>
                </View>
                <View className="flex-1">
                  <AppText variant="h4">{name}</AppText>
                  <AppText variant="caption">ติดต่อล่าสุด: เมื่อวาน</AppText>
                </View>
                <View className={`chip ${stageChips[i]} px-2 py-0.5`}>
                  <AppText variant="caption">{leadStages[i]}</AppText>
                </View>
              </View>
              {i < 2 && <View className="divider" />}
            </View>
          ))}
        </View>

        {/* Info rows */}
        <View className="card gap-1">
          <AppText variant="h2" className="mb-2">ข้อมูลรายละเอียด</AppText>
          {[
            ['ชื่อ-สกุล', 'สมชาย รักดี'],
            ['เบอร์โทร', '081-234-5678'],
            ['อีเมล', 'somchai@email.com'],
            ['แหล่งที่มา', 'เว็บไซต์'],
          ].map(([label, value]) => (
            <View key={label}>
              <View className="info-row">
                <AppText className="info-label">{label}</AppText>
                <AppText className="info-value">{value}</AppText>
              </View>
              <View className="divider" />
            </View>
          ))}
        </View>

        {/* Role chips */}
        <View className="card gap-3">
          <AppText variant="h2">บทบาทผู้ใช้</AppText>
          <View className="flex-row flex-wrap gap-2">
            {['ลูกค้าทั่วไป', 'ตัวแทนขาย', 'หัวหน้าทีม', 'หัวหน้าฝ่าย', 'ผู้ดูแลระบบ'].map((role, i) => (
              <View key={role} className={`role-chip px-3 py-2 ${i === 1 ? 'role-chip-active' : 'role-chip-inactive'}`}>
                <AppText variant="caption" className={i === 1 ? 'text-navy font-prompt-semi-bold' : 'text-text-secondary'}>
                  {role}
                </AppText>
              </View>
            ))}
          </View>
        </View>

        {/* Section header + reference image */}
        <View className="gap-3">
          <View className="section-header">
            <AppText variant="h4" className="text-navy">ธีมอ้างอิง</AppText>
          </View>
          <Image
            source={images.platformReference}
            className="w-full rounded-lg"
            style={{ aspectRatio: 1312 / 1199 }}
            resizeMode="contain"
            accessibilityLabel="ภาพอ้างอิงธีม Mee Tuck"
          />
        </View>

      </View>
    </ScrollView>
  );
}
