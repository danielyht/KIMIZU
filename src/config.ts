/** Dados de contato da loja. Edite aqui. */
export const WHATSAPP_NUMBER = '5511999999999' // DDI + DDD + número, só dígitos

export const siteConfig = {
  name: 'Kimizu',
  nameJp: 'キミズ',
  slogan: 'pequenos momentos, grandes sonhos',
  whatsappNumber: WHATSAPP_NUMBER,
  email: 'oi@kimizu.com.br',
  instagram: 'https://instagram.com/kimizu.loja',
  instagramHandle: '@kimizu.loja',
  businessHours: 'Segunda a sábado, das 10h às 19h',
} as const

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function productWhatsappMessage(productName: string) {
  return `Oi, Kimizu! ✦ Vi o produto "${productName}" no site e quero saber mais 💜`
}

export function generalWhatsappMessage() {
  return 'Oi, Kimizu! ✦ Quero saber mais sobre a loja 💜'
}
