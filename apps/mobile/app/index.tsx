import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  { title: 'خرید و قیمت', icon: '٪', subtitle: 'مقایسه قیمت' },
  { title: 'مراکز خرید', icon: 'B', subtitle: 'پاساژ و فروشگاه' },
  { title: 'هتل و اقامت', icon: 'H', subtitle: 'برای مسافران' },
  { title: 'غذا و کافه', icon: 'R', subtitle: 'رستوران و کافه' },
  { title: 'خدمات شهری', icon: 'S', subtitle: 'نیازهای روزمره' },
  { title: 'دیدنی‌ها', icon: '360', subtitle: 'بانه‌گردی' },
];

const deals = [
  { title: 'پیشنهادهای امروز', body: 'تخفیف‌های معتبر کسب‌وکارهای بانه', badge: 'تازه' },
  { title: 'فروشگاه‌های تأییدشده', body: 'خرید مطمئن‌تر با اطلاعات شفاف فروشنده', badge: '360' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>همه بانه، یک‌جا</Text>
            <Text style={styles.brand}>Baneh<Text style={styles.brandAccent}>360</Text></Text>
          </View>
          <View style={styles.logoMark}>
            <Text style={styles.logoText}>360°</Text>
          </View>
        </View>

        <View style={styles.modeCard}>
          <Text style={styles.modeTitle}>امروز برای چه کاری اینجایی؟</Text>
          <Text style={styles.modeSubtitle}>تجربه بانه ۳۶۰ را متناسب با خودت تنظیم کن</Text>
          <View style={styles.modeRow}>
            <Pressable style={[styles.modeButton, styles.modeButtonPrimary]}>
              <Text style={styles.modeButtonPrimaryText}>من مسافرم</Text>
              <Text style={styles.modeButtonPrimaryCaption}>خرید، اقامت و گردش</Text>
            </Pressable>
            <Pressable style={styles.modeButton}>
              <Text style={styles.modeButtonText}>ساکن بانه‌ام</Text>
              <Text style={styles.modeButtonCaption}>خدمات و پیشنهادهای محلی</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            placeholder="کالا، فروشگاه، هتل یا خدمت..."
            placeholderTextColor="#8A9AA3"
            style={styles.searchInput}
            textAlign="right"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionAction}>همه</Text>
          <Text style={styles.sectionTitle}>دسته‌بندی‌ها</Text>
        </View>

        <View style={styles.grid}>
          {categories.map((item) => (
            <Pressable key={item.title} style={styles.categoryCard}>
              <View style={styles.categoryIcon}>
                <Text style={styles.categoryIconText}>{item.icon}</Text>
              </View>
              <Text style={styles.categoryTitle}>{item.title}</Text>
              <Text style={styles.categorySubtitle}>{item.subtitle}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionAction}>مشاهده همه</Text>
          <Text style={styles.sectionTitle}>منتخب بانه ۳۶۰</Text>
        </View>

        {deals.map((item) => (
          <Pressable key={item.title} style={styles.featureCard}>
            <View style={styles.featureBadge}>
              <Text style={styles.featureBadgeText}>{item.badge}</Text>
            </View>
            <View style={styles.featureCopy}>
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text style={styles.featureBody}>{item.body}</Text>
            </View>
          </Pressable>
        ))}

        <View style={styles.trustCard}>
          <Text style={styles.trustTitle}>قیمت شفاف، انتخاب بهتر</Text>
          <Text style={styles.trustBody}>
            در Baneh360 زمان آخرین بروزرسانی قیمت و وضعیت تأیید فروشگاه همیشه مشخص است.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6FAFB' },
  content: { padding: 20, paddingBottom: 44, gap: 18 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eyebrow: { color: '#647881', fontSize: 13, textAlign: 'right', marginBottom: 2 },
  brand: { color: '#083F73', fontSize: 29, fontWeight: '900', letterSpacing: -1 },
  brandAccent: { color: '#08ADA9' },
  logoMark: { width: 56, height: 56, borderRadius: 18, backgroundColor: '#083F73', alignItems: 'center', justifyContent: 'center' },
  logoText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  modeCard: { backgroundColor: '#FFFFFF', borderRadius: 26, padding: 20, borderWidth: 1, borderColor: '#E6EFF1' },
  modeTitle: { color: '#102F3D', fontSize: 20, fontWeight: '900', textAlign: 'right' },
  modeSubtitle: { color: '#71838C', fontSize: 13, marginTop: 7, marginBottom: 18, textAlign: 'right', lineHeight: 21 },
  modeRow: { flexDirection: 'row-reverse', gap: 10 },
  modeButton: { flex: 1, minHeight: 88, borderRadius: 19, borderWidth: 1, borderColor: '#DDE9EC', padding: 14, justifyContent: 'center' },
  modeButtonPrimary: { backgroundColor: '#083F73', borderColor: '#083F73' },
  modeButtonText: { color: '#153D4D', fontSize: 15, fontWeight: '800', textAlign: 'right' },
  modeButtonPrimaryText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900', textAlign: 'right' },
  modeButtonCaption: { color: '#778A93', fontSize: 11, marginTop: 6, textAlign: 'right' },
  modeButtonPrimaryCaption: { color: '#C9E6EB', fontSize: 11, marginTop: 6, textAlign: 'right' },
  searchBox: { minHeight: 58, backgroundColor: '#FFFFFF', borderRadius: 19, borderWidth: 1, borderColor: '#E2ECEE', paddingHorizontal: 16, flexDirection: 'row-reverse', alignItems: 'center', gap: 10 },
  searchIcon: { color: '#08A8A4', fontSize: 27, fontWeight: '700' },
  searchInput: { flex: 1, color: '#163844', fontSize: 14, paddingVertical: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  sectionTitle: { color: '#153845', fontSize: 18, fontWeight: '900', textAlign: 'right' },
  sectionAction: { color: '#079A98', fontSize: 12, fontWeight: '700' },
  grid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 10 },
  categoryCard: { width: '31%', minWidth: 104, flexGrow: 1, backgroundColor: '#FFFFFF', borderRadius: 20, borderWidth: 1, borderColor: '#E6EFF1', padding: 13, alignItems: 'flex-end' },
  categoryIcon: { width: 39, height: 39, borderRadius: 13, backgroundColor: '#E9F8F7', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  categoryIconText: { color: '#087F82', fontWeight: '900', fontSize: 12 },
  categoryTitle: { color: '#173B48', fontSize: 13, fontWeight: '800', textAlign: 'right' },
  categorySubtitle: { color: '#8A9AA1', fontSize: 10, marginTop: 4, textAlign: 'right' },
  featureCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 17, borderWidth: 1, borderColor: '#E6EFF1', flexDirection: 'row-reverse', alignItems: 'center', gap: 14 },
  featureBadge: { width: 52, height: 52, borderRadius: 17, backgroundColor: '#E9F8F7', alignItems: 'center', justifyContent: 'center' },
  featureBadgeText: { color: '#078D8B', fontSize: 12, fontWeight: '900' },
  featureCopy: { flex: 1 },
  featureTitle: { color: '#123744', fontSize: 15, fontWeight: '900', textAlign: 'right' },
  featureBody: { color: '#74868E', fontSize: 12, marginTop: 5, textAlign: 'right', lineHeight: 19 },
  trustCard: { backgroundColor: '#0B4A74', borderRadius: 24, padding: 20, marginTop: 4 },
  trustTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '900', textAlign: 'right' },
  trustBody: { color: '#D6EDF0', fontSize: 12, marginTop: 8, lineHeight: 21, textAlign: 'right' },
});
