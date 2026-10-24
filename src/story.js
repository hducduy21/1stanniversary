const base = import.meta.env.BASE_URL
const img = (name) => ({ type: 'img', src: `${base}media/${name}.jpg` })
const video = (name, hasAudio = false) => ({ type: 'video', src: `${base}media/${name}.mp4`, hasAudio })

export const media = {
  hero: `${base}media/background_01.jpg`,
  fox: `${base}media/background_02.jpg`,
  bunny: `${base}media/background_03.jpg`,
  finale: `${base}media/background_04.jpg`,
}

// kind: 'photo' (mặc định) | 'text' (không ảnh, khoảnh khắc chữ) | 'proposal' | 'snap' (chỉ ảnh)
export const chapters = [
  {
    no: 'Chương I',
    title: 'Ngày mưa ấy',
    subtitle: 'Khi một tin nhắn thay đổi tất cả',
    bg: `${base}media/01.jpg`,
    items: [
      {
        date: '17 · 08 · 2025',
        title: 'Mọi chuyện bắt đầu từ đây',
        media: [img('01')],
        text: [
          'Những ngày cuối cùng trước khi anh rời thành phố này, em — người anh mong đợi nhất — lại là người chủ động nhắn tin cho anh.',
          'Một cơ hội bất ngờ rơi xuống tay và anh biết mình không thể để nó trôi đi. Dưới cơn mưa hôm ấy, anh đã nói:',
        ],
        quote: 'Anh có thể đến đây mỗi tháng, chỉ để được gặp em.',
        outro: 'Có lẽ chính từ khoảnh khắc đó, anh đã thật sự say em. Và cơn mưa ấy sẽ sống mãi trong anh.',
      },
      {
        date: '22 · 08 · 2025',
        title: 'Mang em theo về biển',
        media: [img('02')],
        text: [
          'Anh trở về Nha Trang, trong hành lý có thêm một kỷ vật của em. Biển vẫn xanh như thế, chỉ có anh là đã khác — vì trong lòng giờ đã có một người để nhớ.',
        ],
      },
      {
        date: '13 · 09 · 2025',
        title: 'Chuyến đi lúc tờ mờ sáng',
        media: [img('03')],
        text: [
          'Trời còn chưa kịp sáng, anh đã lên đường về lại thành phố cũ. Quãng đường dài đến mấy cũng hoá ngắn, khi ở cuối con đường ấy là em.',
        ],
      },
      {
        date: 'Chiều 13 · 09 · 2025',
        title: 'Sân trường cũ',
        media: [img('04')],
        text: [
          'Buổi chiều, mình dạo bước trong ngôi trường cũ. Những hàng cây, những dãy lớp quen thuộc bỗng dịu dàng đến lạ — vì lần này, bên cạnh anh có em.',
        ],
      },
      {
        date: 'Tối 13 · 09 · 2025',
        title: 'Bữa tiệc thứ hai',
        media: [img('05')],
        text: [
          'Tối đó, mình có bữa tiệc thứ hai cùng nhau. Đồ ăn ngon thật, nhưng điều anh nhớ nhất lại là nụ cười của em ở phía bên kia bàn.',
        ],
      },
      {
        date: '14 · 09 · 2025',
        title: 'Người tiễn anh về',
        media: [img('06')],
        text: [
          'Em đưa anh về lại Nha Trang. Lần đầu tiên anh thấy chia tay cũng có thể ngọt ngào đến vậy — vì anh biết, mình nhất định sẽ gặp lại.',
        ],
      },
    ],
  },
  {
    no: 'Chương II',
    title: 'Lời tỏ tình',
    subtitle: 'Ngày “anh” và “em” thành “chúng mình”',
    bg: `${base}media/08.jpg`,
    items: [
      {
        kind: 'text',
        date: '25 · 10 · 2025',
        lines: [
          'Tháng mười, anh lại vào thành phố cũ để gặp em.',
          'Mình đến gần nhau nhanh đến bất ngờ — hợp tính, hợp nết, cùng nhìn thế giới theo một cách.',
          'Và anh biết, đã đến lúc…',
        ],
      },
      {
        kind: 'proposal',
        date: '25 · 10 · 2025',
        title: 'Em đã đồng ý',
        media: [img('08')],
        text: ['Anh ngỏ lời. Em gật đầu. Và từ giây phút ấy, câu chuyện của chúng mình chính thức bắt đầu.'],
      },
      {
        date: '26 · 10 · 2025',
        title: 'Ngày đầu tiên làm người yêu',
        media: [img('09')],
        text: [
          'Ngày đầu tiên là của nhau, mình… cùng nhau đi học. Giản dị vậy thôi, mà sao hôm ấy cả thế giới đều đáng yêu lạ.',
        ],
      },
    ],
  },
  {
    no: 'Chương III',
    title: 'Gần nhau hơn',
    subtitle: 'Biển, bão và những lần đầu tiên',
    bg: `${base}media/background_06.jpg`,
    items: [
      {
        date: '08 · 11 · 2025',
        title: 'Em ra thăm anh',
        media: [img('10')],
        text: ['Tháng này, đến lượt người yêu anh vượt đường xa ra thăm anh. Hẹ hẹ — anh vui đến mức chẳng giấu nổi.'],
      },
      {
        date: '08 · 11 · 2025',
        title: 'Biển và những câu chuyện',
        media: [img('11')],
        text: [
          'Mình dạo biển, kể cho nhau nghe thật nhiều. Anh được biết về gia đình em, về những điều em đã đi qua. Anh hiểu em hơn — và thương em nhiều hơn.',
        ],
      },
      {
        date: '20 · 11 · 2025',
        title: 'Sau cơn bão',
        media: [img('12')],
        text: [
          'Thiên tai đi qua, anh vẫn bình an. Và anh bắt đầu hành trình trở về thành phố cũ — trở về gần em hơn.',
        ],
      },
      {
        date: 'Tháng 12 · 2025',
        title: 'Những ngày được ở gần nhau',
        media: [video('13')],
        text: [
          'Cuối cùng mình cũng được ở gần nhau. Lần đầu nấu ăn cùng nhau, lần đầu cụng ly cùng nhau, đi chơi nhiều hơn… và tất nhiên, cũng “đánh nhau”, giận nhau nhiều hơn.',
          'Nhưng như thế mới là yêu thật, phải không em?',
        ],
      },
      {
        date: '02 · 01 · 2026',
        title: 'Giao thừa của riêng mình',
        media: [img('14')],
        text: [
          'Chẳng chen chúc giữa phố đông, mình chọn một góc sân thượng cho riêng hai đứa. Không cần pháo hoa — có em là đủ cho một năm mới thật đẹp.',
        ],
      },
      {
        kind: 'snap',
        date: '23 · 01 · 2026',
        title: 'hẹ hẹ',
        media: [img('15')],
      },
      {
        date: '07 · 02 · 2026',
        title: 'Sinh nhật đến sớm',
        media: [img('16')],
        text: [
          'Sinh nhật em năm nay mình không được ở cạnh nhau, nên anh tổ chức sớm. Dù hôm ấy anh không ở đó, anh vẫn muốn là người đầu tiên chúc mừng em.',
        ],
      },
    ],
  },
  {
    no: 'Chương IV',
    title: 'Những ngày thương',
    subtitle: 'Có giận hờn, có khoảng cách, nhưng luôn có nhau',
    bg: `${base}media/background_05.jpg`,
    items: [
      {
        kind: 'text',
        date: 'Sau Tết · 2026',
        lines: [
          'Sau Tết, em vào thành phố sớm hơn anh.',
          'Có những ngày mình xa nhau một chút — không chỉ là quãng đường.',
          'Nhưng chính những ngày ấy dạy anh rằng: muốn đi thật lâu, phải biết cùng nhau bước qua.',
        ],
      },
      {
        date: '08 · 03 · 2026',
        title: 'Hoa của anh là tôm sú',
        media: [video('18', true)],
        text: ['Người ta tặng hoa, anh tặng… tôm sú. Vì anh biết người yêu anh thích gì mà 😆'],
      },
      {
        date: '03 · 04 · 2026',
        title: 'Sinh nhật anh',
        media: [img('19')],
        text: ['Đến lượt em tổ chức sinh nhật cho anh. Món quà lớn nhất năm ấy, là có em ở bên.'],
      },
      {
        date: 'Một ngày đáng yêu',
        title: 'Điệu nhảy của em',
        media: [video('20', true)],
        text: ['Và đây là điệu nhảy của em — thứ anh có thể xem đi xem lại cả trăm lần mà không chán.'],
      },
      {
        date: '27 · 04 · 2026',
        title: 'Góc nhỏ ở quận 2',
        media: [img('21')],
        text: ['Anh chuyển sang quận 2. Kỳ nghỉ 30/4 – 1/5, em ở bên anh, cùng anh làm quen với góc phố mới.'],
      },
      {
        date: '30 · 04 · 2026',
        title: 'Vị miền Trung & ánh đèn Landmark',
        media: [img('22')],
        text: [
          'Mình đi ăn đồ miền Trung, rồi ra công viên ngắm Landmark lên đèn. Thành phố rộng lớn là thế, mà tối hôm ấy anh chỉ nhìn thấy mỗi em.',
        ],
      },
      {
        date: '10 · 05 · 2026',
        title: 'Gần quận 7 và những âm thanh lạ',
        media: [img('23')],
        text: ['Anh dọn về gần quận 7. Ở đây, anh hay nghe thấy… mấy tiếng lạ lạ :))'],
      },
      {
        date: '13 · 05 · 2026',
        title: 'Bác sĩ riêng của anh',
        media: [img('24')],
        text: ['Anh ốm và em hoá thành bác sĩ riêng. Được em chăm thế này, anh thấy ốm thêm vài hôm cũng đáng.'],
      },
      {
        date: '17 · 05 · 2026',
        title: 'Em phởn, em giận',
        media: [img('25')],
        text: ['Hôm ấy em phởn… rồi em giận anh. Giận thì giận, thương vẫn thương — mà em giận cũng đáng yêu ghê.'],
      },
    ],
  },
  {
    no: 'Chương V',
    title: 'Ngao du & lựa chọn',
    subtitle: 'Đi đâu không quan trọng, quan trọng là đi cùng ai',
    bg: `${base}media/28.2.jpg`,
    items: [
      {
        date: 'Tháng 6 · 2026',
        title: 'Mùa xa nhau',
        media: [img('26')],
        text: [
          'Tháng sáu, anh phải về Nha Trang. Mình lại xa nhau mấy tháng. Anh đi ngao du nhiều hơn, mang theo nỗi nhớ em đến mọi nơi anh đặt chân.',
        ],
      },
      {
        date: '20 · 06 · 2026',
        title: 'Em ra với biển của anh',
        media: [img('27')],
        text: ['Em ra Nha Trang ngao du cùng anh. Biển của anh, cuối cùng cũng có em.'],
      },
      {
        date: '20 · 06 · 2026',
        title: 'Chuyến đi nhớ nhất',
        media: [img('28.1'), img('28.2'), img('28.3')],
        text: [
          'Một chuyến đi vất vả, lắm trắc trở — nhưng đến giờ, đó vẫn là chuyến ngao du mà cả hai đứa nhớ nhất. Hoá ra, chỉ cần có nhau, đường khó mấy cũng thành kỷ niệm đẹp.',
        ],
      },
      {
        kind: 'text',
        date: 'Tháng 7 · 2026',
        lines: [
          'Vì tình yêu này, anh gác lại cơ hội công việc cũ,',
          'trở về thành phố cũ để tìm một khởi đầu mới.',
          'Có những lựa chọn chẳng cần đắn đo — khi câu trả lời là em.',
        ],
      },
      {
        date: '26 · 07 · 2026',
        title: 'Sầu riêng nhà anh',
        media: [img('30')],
        text: ['Em thưởng thức sầu riêng nhà anh — thơm, béo và ngọt ngào y như em vậy.'],
      },
      {
        date: '09 · 09 · 2026',
        title: 'Trận cầu lông',
        media: [img('31')],
        text: [
          'Mình từng hứa cùng nhau đánh cầu lông và đã làm được — mặc dù chỉ đánh được 15 phút :))',
        ],
      },
    ],
  },
]

export const wishes = [
  'Chúc cho anh luôn yêu em và em luôn yêu anh.',
  'Chúc chúng mình cùng nhau lớn lên, để tình yêu này ngày một bền vững.',
  'Chúc chúng mình đủ dũng cảm để vượt qua thật nhiều thử thách phía trước.',
  'Chúc cho mỗi cơn mưa sau này đều nhắc mình nhớ về ngày đầu tiên.',
  'Chúc cho bàn tay này vẫn nắm thật chặt, dù đường xa hay ngày giông.',
  'Chúc cho những chuyến ngao du còn dài và điểm đến cuối cùng luôn là nhau.',
  'Và chúc cho 365 ngày qua chỉ là trang đầu tiên của một câu chuyện rất, rất dài.',
]
