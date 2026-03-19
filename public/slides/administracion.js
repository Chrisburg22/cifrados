
        // ── YOUTUBE UNMUTE ────────────────────────────────────────────────
        function unmuteYT() {
            const iframe = document.getElementById('yt-iframe');
            const btn = document.getElementById('unmute-btn');
            if (!iframe) return;
            // Replace src without mute=1 to get sound
            const src = iframe.src.replace('mute=1', 'mute=0');
            iframe.src = src;
            btn.style.display = 'none';
            const toast = document.getElementById('music-toast');
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
        }

        // ── PAUSE YOUTUBE WHEN LEAVING SLIDE 1 ────────────────────────────
        function pauseYTIfLeaving(newSlide) {
            if (newSlide !== 1) {
                const iframe = document.getElementById('yt-iframe');
                if (iframe) {
                    // Post pause message to YouTube player
                    iframe.contentWindow.postMessage(
                        JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
                }
            }
        }

        // ── FLOATING NOTES ───────────────────────────────────────────────
        function spawnNotes() {
            const container = document.getElementById('fnotes');
            const notes = ['♪', '♫', '♩', '♬', '♭', '♮'];
            setInterval(() => {
                const el = document.createElement('span');
                el.className = 'fnote';
                el.textContent = notes[Math.floor(Math.random() * notes.length)];
                el.style.left = Math.random() * 100 + 'vw';
                el.style.animationDuration = (8 + Math.random() * 12) + 's';
                el.style.animationDelay = '0s';
                el.style.fontSize = (14 + Math.random() * 14) + 'px';
                el.style.color = `rgba(${Math.floor(180 + Math.random() * 75)}, ${Math.floor(80 + Math.random() * 100)}, 0, ${0.1 + Math.random() * 0.15})`;
                container.appendChild(el);
                setTimeout(() => el.remove(), 22000);
            }, 1800);
        }

        // ── SLIDE NAVIGATION ─────────────────────────────────────────────
        const total = 14;
        let cur = 1;
        const dotsEl = document.getElementById('dots');
        const dotsElTop = document.getElementById('dots-top');
        for (let i = 1; i <= total; i++) {
            const d = document.createElement('div');
            d.className = 'dot' + (i === 1 ? ' active' : '');
            d.onclick = () => goTo(i);
            dotsEl.appendChild(d);
            if (dotsElTop) {
                const dt = document.createElement('div');
                dt.className = 'dot' + (i === 1 ? ' active' : '');
                dt.onclick = () => goTo(i);
                dotsElTop.appendChild(dt);
            }
        }
        function goTo(n) {
            
            const prev = document.getElementById('s' + cur);
            prev.classList.remove('active');
            prev.classList.add('exit');
            setTimeout(() => prev.classList.remove('exit'), 500);
            cur = n;
            document.getElementById('s' + cur).classList.add('active');
            document.getElementById('counter').textContent = cur + ' / ' + total;
            if(document.getElementById('counter-top')) document.getElementById('counter-top').textContent = cur + ' / ' + total;
            document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i + 1 === cur));
            if (dotsElTop) dotsElTop.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i + 1 === cur));
        }
        function nextSlide() { if (cur < total) goTo(cur + 1); }
        function prevSlide() { if (cur > 1) goTo(cur - 1); }
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide();
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide();
        });

        // ── CODE VIEWER ───────────────────────────────────────────────────
        function showJob(key) {
            document.querySelectorAll('.code-block').forEach(b => b.classList.remove('visible'));
            document.getElementById('cb-' + key).classList.add('visible');
            document.querySelectorAll('.job-btn').forEach(b => b.classList.remove('active'));
            event.currentTarget.classList.add('active');
            document.getElementById('job-badge').textContent = key;
            document.querySelector('.code-body').scrollTop = 0;
        }

        // ── INIT ──────────────────────────────────────────────────────────
        window.addEventListener('load', () => {
            spawnNotes();
            // YT iframe ready — nothing extra needed on load
        });

        // ════════════════════════════════════════════════════════════════
        //  🎺  WILLIE COLÓN — "Oh Qué Será" · MP3 Audio Controller
        // ════════════════════════════════════════════════════════════════
        (function () {
            const audio = document.getElementById('salsa-audio');
            const playBtn = document.getElementById('play-btn');
            const volSlide = document.getElementById('vol-slider');
            const progFill = document.getElementById('prog-fill');
            const toast = document.getElementById('music-toast');
            const closeBtn = document.getElementById('close-music');
            if (!audio) return;

            audio.volume = 0.7;

            function fadeIn(targetVol, ms) {
                audio.volume = 0;
                const steps = 40, step = targetVol / steps, delay = ms / steps;
                let i = 0;
                const iv = setInterval(() => {
                    i++;
                    audio.volume = Math.min(targetVol, step * i);
                    if (i >= steps) clearInterval(iv);
                }, delay);
            }

            function togglePlay() {
                if (audio.paused) {
                    audio.play();
                    if (playBtn) playBtn.textContent = '⏸';
                } else {
                    audio.pause();
                    if (playBtn) playBtn.textContent = '▶';
                }
            }

            if (playBtn) playBtn.addEventListener('click', togglePlay);
            if (volSlide) volSlide.addEventListener('input', () => { audio.volume = parseFloat(volSlide.value); });

            audio.addEventListener('timeupdate', () => {
                if (audio.duration && progFill)
                    progFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
            });

            const progWrap = document.getElementById('prog-wrap');
            if (progWrap) progWrap.addEventListener('click', e => {
                const r = progWrap.getBoundingClientRect();
                audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
            });

            if (closeBtn) closeBtn.addEventListener('click', () => {
                audio.pause();
                if (toast) { toast.style.opacity = '0'; setTimeout(() => toast.style.display = 'none', 600); }
            });

            let started = false;
            function startMusic() {
                if (started) return; started = true;
                audio.play().then(() => {
                    fadeIn(parseFloat(volSlide ? volSlide.value : '0.7'), 1400);
                    if (playBtn) playBtn.textContent = '⏸';
                    if (toast) toast.classList.add('show');
                }).catch(() => { if (toast) toast.classList.add('show'); });
            }

            ['click', 'keydown', 'touchstart'].forEach(ev =>
                document.addEventListener(ev, startMusic, { once: true, passive: true })
            );
        })();

    


        // ═══════════════════════════════════════════════════
        //  WILLIE COLÓN — Global Salsa Theme Engine
        // ═══════════════════════════════════════════════════

        const VINYL_URI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgODAwIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCI+CiAgPGRlZnM+CiAgICA8IS0tIEJhY2tncm91bmQgZ3JhZGllbnQgLSBkZWVwIGxhdGluIG5pZ2h0IC0tPgogICAgPHJhZGlhbEdyYWRpZW50IGlkPSJiZ0dyYWQiIGN4PSI1MCUiIGN5PSI0MCUiIHI9IjcwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTBhMDAiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiMwZDA1MDAiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDAwMDAwIi8+CiAgICA8L3JhZGlhbEdyYWRpZW50PgogICAgCiAgICA8IS0tIFZpbnlsIHJlY29yZCBncmFkaWVudCAtLT4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0idmlueWxHcmFkIiBjeD0iNTAlIiBjeT0iNTAlIiByPSI1MCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMWExYTFhIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iNDAlIiBzdG9wLWNvbG9yPSIjMGEwYTBhIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iNzAlIiBzdG9wLWNvbG9yPSIjMTExIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzA1MDUwNSIvPgogICAgPC9yYWRpYWxHcmFkaWVudD4KCiAgICA8IS0tIENlbnRlciBsYWJlbCBncmFkaWVudCAtIEZhbmlhIFJlY29yZHMgcmVkIC0tPgogICAgPHJhZGlhbEdyYWRpZW50IGlkPSJsYWJlbEdyYWQiIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNlNjMwMDAiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI2MCUiIHN0b3AtY29sb3I9IiNiODIyMDAiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOGExNTAwIi8+CiAgICA8L3JhZGlhbEdyYWRpZW50PgoKICAgIDwhLS0gR29sZCBzaGluZSBncmFkaWVudCAtLT4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ29sZEdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZkNzAwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMzAlIiBzdG9wLWNvbG9yPSIjZmY5ZjAwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iNjAlIiBzdG9wLWNvbG9yPSIjZmZkNzAwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2M4ODYwYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KCiAgICA8IS0tIFRyb21ib25lIGdyYWRpZW50IC0tPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJ0cm9tYm9uZUdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZlMDY2Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMjUlIiBzdG9wLWNvbG9yPSIjZmZkNzAwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjYjg4NjBiIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iNzUlIiBzdG9wLWNvbG9yPSIjZmZkNzAwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZmZTA2NiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KCiAgICA8IS0tIEdsb3cgZmlsdGVyIC0tPgogICAgPGZpbHRlciBpZD0iZ2xvdyI+CiAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjQiIHJlc3VsdD0iY29sb3JlZEJsdXIiLz4KICAgICAgPGZlTWVyZ2U+PGZlTWVyZ2VOb2RlIGluPSJjb2xvcmVkQmx1ciIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT4KICAgIDwvZmlsdGVyPgoKICAgIDwhLS0gU29mdCBnbG93IC0tPgogICAgPGZpbHRlciBpZD0ic29mdEdsb3ciPgogICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI4IiByZXN1bHQ9ImNvbG9yZWRCbHVyIi8+CiAgICAgIDxmZU1lcmdlPjxmZU1lcmdlTm9kZSBpbj0iY29sb3JlZEJsdXIiLz48ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiLz48L2ZlTWVyZ2U+CiAgICA8L2ZpbHRlcj4KCiAgICA8IS0tIFZpbnlsIGdyb292ZSBwYXR0ZXJuIC0tPgogICAgPHBhdHRlcm4gaWQ9Imdyb292ZVBhdHRlcm4iIHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHBhdHRlcm5Vbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICA8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgogICAgPC9wYXR0ZXJuPgoKICAgIDwhLS0gSGFsZnRvbmUgZG90cyBmb3IgcmV0cm8gZmVlbCAtLT4KICAgIDxwYXR0ZXJuIGlkPSJkb3RzIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8Y2lyY2xlIGN4PSI2IiBjeT0iNiIgcj0iMS41IiBmaWxsPSJyZ2JhKDI1NSw4MCwwLDAuMTUpIi8+CiAgICA8L3BhdHRlcm4+CgogICAgPCEtLSBDbGlwIGZvciB2aW55bCAtLT4KICAgIDxjbGlwUGF0aCBpZD0idmlueWxDbGlwIj4KICAgICAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iNDAwIiByPSIyODAiLz4KICAgIDwvY2xpcFBhdGg+CiAgPC9kZWZzPgoKICA8IS0tIEJhY2tncm91bmQgLS0+CiAgPHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9InVybCgjYmdHcmFkKSIvPgogIAogIDwhLS0gSGFsZnRvbmUgdGV4dHVyZSBvdmVybGF5IC0tPgogIDxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIiBmaWxsPSJ1cmwoI2RvdHMpIiBvcGFjaXR5PSIwLjYiLz4KCiAgPCEtLSBCYWNrZ3JvdW5kIGdsb3cgLSB3YXJtIG9yYW5nZS9yZWQgbGF0aW4gaGVhdCAtLT4KICA8Y2lyY2xlIGN4PSI0MDAiIGN5PSIzODAiIHI9IjM1MCIgZmlsbD0icmdiYSgyMDAsNTAsMCwwLjA2KSIvPgogIDxjaXJjbGUgY3g9IjIwMCIgY3k9IjYwMCIgcj0iMjAwIiBmaWxsPSJyZ2JhKDI1NSwxMDAsMCwwLjA0KSIvPgogIDxjaXJjbGUgY3g9IjYyMCIgY3k9IjE4MCIgcj0iMTgwIiBmaWxsPSJyZ2JhKDI1NSwxODAsMCwwLjA0KSIvPgoKICA8IS0tID09PSBWSU5ZTCBSRUNPUkQgPT09IC0tPgogIDwhLS0gT3V0ZXIgcmluZyBnbG93IC0tPgogIDxjaXJjbGUgY3g9IjQwMCIgY3k9IjQwMCIgcj0iMjg1IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDE0MCwwLDAuMTUpIiBzdHJva2Utd2lkdGg9IjMiLz4KICAKICA8IS0tIE1haW4gdmlueWwgYm9keSAtLT4KICA8Y2lyY2xlIGN4PSI0MDAiIGN5PSI0MDAiIHI9IjI4MCIgZmlsbD0idXJsKCN2aW55bEdyYWQpIi8+CiAgCiAgPCEtLSBWaW55bCBncm9vdmVzIC0gY29uY2VudHJpYyBjaXJjbGVzIC0tPgogIDxjaXJjbGUgY3g9IjQwMCIgY3k9IjQwMCIgcj0iMjYwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNCkiIHN0cm9rZS13aWR0aD0iMC44Ii8+CiAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iNDAwIiByPSIyNDUiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIwLjYiLz4KICA8Y2lyY2xlIGN4PSI0MDAiIGN5PSI0MDAiIHI9IjIzMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDQpIiBzdHJva2Utd2lkdGg9IjAuOCIvPgogIDxjaXJjbGUgY3g9IjQwMCIgY3k9IjQwMCIgcj0iMjE1IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMC42Ii8+CiAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iNDAwIiByPSIyMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA0KSIgc3Ryb2tlLXdpZHRoPSIwLjgiLz4KICA8Y2lyY2xlIGN4PSI0MDAiIGN5PSI0MDAiIHI9IjE4NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjAuNiIvPgogIDxjaXJjbGUgY3g9IjQwMCIgY3k9IjQwMCIgcj0iMTcwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNCkiIHN0cm9rZS13aWR0aD0iMC44Ii8+CiAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iNDAwIiByPSIxNTUiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iNDAwIiByPSIxNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIwLjYiLz4KCiAgPCEtLSBDZW50ZXIgbGFiZWwgYXJlYSAoRmFuaWEgcmVkKSAtLT4KICA8Y2lyY2xlIGN4PSI0MDAiIGN5PSI0MDAiIHI9IjkwIiBmaWxsPSJ1cmwoI2xhYmVsR3JhZCkiLz4KICAKICA8IS0tIExhYmVsIGlubmVyIHJpbmcgLS0+CiAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iNDAwIiByPSI4OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyMDAsMCwwLjQpIiBzdHJva2Utd2lkdGg9IjEuNSIvPgoKICA8IS0tIEZBTklBIFJFQ09SRFMgdGV4dCBvbiBsYWJlbCAtIGN1cnZlZCAtLT4KICA8cGF0aCBpZD0ibGFiZWxUb3BBcmMiIGQ9Ik0gMzMwLDM4MCBBIDcwLDcwIDAgMCwxIDQ3MCwzODAiIGZpbGw9Im5vbmUiLz4KICA8dGV4dCBmb250LWZhbWlseT0iQXJpYWwgQmxhY2ssIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZvbnQtd2VpZ2h0PSI5MDAiIGZpbGw9IiNmZmQ3MDAiIGxldHRlci1zcGFjaW5nPSIzIj4KICAgIDx0ZXh0UGF0aCBocmVmPSIjbGFiZWxUb3BBcmMiIHN0YXJ0T2Zmc2V0PSI4JSI+RkFOSUEgIFJFQ09SRFM8L3RleHRQYXRoPgogIDwvdGV4dD4KCiAgPCEtLSBXSUxMSUUgQ09MT04gb24gbGFiZWwgLS0+CiAgPHRleHQgeD0iNDAwIiB5PSIzOTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCBCbGFjaywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMSIgZm9udC13ZWlnaHQ9IjkwMCIgZmlsbD0iI2ZmZmZmZiIgbGV0dGVyLXNwYWNpbmc9IjIiPldJTExJRTwvdGV4dD4KICA8dGV4dCB4PSI0MDAiIHk9IjQxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iOTAwIiBmaWxsPSIjZmZkNzAwIiBsZXR0ZXItc3BhY2luZz0iMiI+Q09Mw5NOPC90ZXh0PgoKICA8IS0tIENlbnRlciBob2xlIC0tPgogIDxjaXJjbGUgY3g9IjQwMCIgY3k9IjQwMCIgcj0iNiIgZmlsbD0iIzAwMCIvPgogIDxjaXJjbGUgY3g9IjQwMCIgY3k9IjQwMCIgcj0iNCIgZmlsbD0iIzExMSIvPgoKICA8IS0tID09PSBUUk9NQk9ORSA9PT0gLS0+CiAgPCEtLSBNYWluIHNsaWRlIHR1YmUgLSBwb3NpdGlvbmVkIGRpYWdvbmFsbHkgYWNyb3NzIHRoZSB2aW55bCAtLT4KICA8IS0tIE91dGVyIHR1YmUgZ29pbmcgZnJvbSBib3R0b20tbGVmdCB0byB1cHBlci1yaWdodCAtLT4KICA8ZyBmaWx0ZXI9InVybCgjZ2xvdykiPgogICAgPCEtLSBCZWxsIG9mIHRyb21ib25lIChyaWdodCBzaWRlLCBsYXJnZSBmbGFyZWQgZW5kKSAtLT4KICAgIDxlbGxpcHNlIGN4PSI2MzAiIGN5PSIxODUiIHJ4PSI1NSIgcnk9IjI4IiBmaWxsPSJ1cmwoI3Ryb21ib25lR3JhZCkiIG9wYWNpdHk9IjAuOTUiIHRyYW5zZm9ybT0icm90YXRlKC0zNSwgNjMwLCAxODUpIi8+CiAgICA8ZWxsaXBzZSBjeD0iNjMwIiBjeT0iMTg1IiByeD0iNDgiIHJ5PSIyMiIgZmlsbD0iIzBkMDUwMCIgdHJhbnNmb3JtPSJyb3RhdGUoLTM1LCA2MzAsIDE4NSkiLz4KICAgIDxlbGxpcHNlIGN4PSI2MzAiIGN5PSIxODUiIHJ4PSI1NSIgcnk9IjI4IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgdHJhbnNmb3JtPSJyb3RhdGUoLTM1LCA2MzAsIDE4NSkiLz4KICAgIAogICAgPCEtLSBNYWluIG91dGVyIHNsaWRlIHR1YmUgLS0+CiAgICA8bGluZSB4MT0iNTcwIiB5MT0iMjMwIiB4Mj0iMjYwIiB5Mj0iNTQwIiBzdHJva2U9InVybCgjdHJvbWJvbmVHcmFkKSIgc3Ryb2tlLXdpZHRoPSIyMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8bGluZSB4MT0iNTcwIiB5MT0iMjMwIiB4Mj0iMjYwIiB5Mj0iNTQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICAKICAgIDwhLS0gSW5uZXIgc2xpZGUgdHViZSAoc2xpZ2h0bHkgb2Zmc2V0KSAtLT4KICAgIDxsaW5lIHgxPSI1NDUiIHkxPSIyNTUiIHgyPSIyNDAiIHkyPSI1NjUiIHN0cm9rZT0iI2M4ODYwYSIgc3Ryb2tlLXdpZHRoPSIxNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8bGluZSB4MT0iNTQ1IiB5MT0iMjU1IiB4Mj0iMjQwIiB5Mj0iNTY1IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KCiAgICA8IS0tIENvbm5lY3RpbmcgYm93IGF0IGJvdHRvbSAtLT4KICAgIDxwYXRoIGQ9Ik0gMjM1IDU3MiBRIDIwMCA2MTAgMjMwIDY0MCBRIDI1NSA2NjUgMjgwIDY1MCBRIDI5NSA2NDAgMjg1IDYyMCBRIDI2NSA1OTUgMjYwIDU2NSIgCiAgICAgICAgICBmaWxsPSJub25lIiBzdHJva2U9InVybCgjdHJvbWJvbmVHcmFkKSIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8cGF0aCBkPSJNIDIzNSA1NzIgUSAyMDAgNjEwIDIzMCA2NDAgUSAyNTUgNjY1IDI4MCA2NTAgUSAyOTUgNjQwIDI4NSA2MjAgUSAyNjUgNTk1IDI2MCA1NjUiIAogICAgICAgICAgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTIpIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgoKICAgIDwhLS0gTW91dGhwaWVjZSBhcmVhIC0tPgogICAgPGVsbGlwc2UgY3g9IjU4NSIgY3k9IjIxNSIgcng9IjEyIiByeT0iNiIgZmlsbD0iI2ZmZDcwMCIgdHJhbnNmb3JtPSJyb3RhdGUoLTM1LCA1ODUsIDIxNSkiLz4KICAgIDxsaW5lIHgxPSI1ODUiIHkxPSIyMTUiIHgyPSI2NDAiIHkyPSIxNjUiIHN0cm9rZT0iI2ZmZDcwMCIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIDxsaW5lIHgxPSI2NDgiIHkxPSIxNTgiIHgyPSI2NjUiIHkyPSIxNDIiIHN0cm9rZT0iI2ZmZDcwMCIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIAogICAgPCEtLSBUdW5pbmcgc2xpZGUgbG9vcCAtLT4KICAgIDxwYXRoIGQ9Ik0gNDgwIDMyMCBRIDQ2MCAyOTAgNDQwIDMxMCBRIDQyMCAzMzAgNDQwIDM1NSBRIDQ2MCAzNzUgNDkwIDM1NSIgCiAgICAgICAgICBmaWxsPSJub25lIiBzdHJva2U9InVybCgjdHJvbWJvbmVHcmFkKSIgc3Ryb2tlLXdpZHRoPSIxNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICAKICAgIDwhLS0gV2F0ZXIga2V5IC8gc3BpdCB2YWx2ZSAtLT4KICAgIDxjaXJjbGUgY3g9IjQzMCIgY3k9IjM0MCIgcj0iNiIgZmlsbD0iI2M4ODYwYSIgc3Ryb2tlPSIjZmZkNzAwIiBzdHJva2Utd2lkdGg9IjEuNSIvPgogIDwvZz4KCiAgPCEtLSA9PT0gREVDT1JBVElWRSBFTEVNRU5UUyA9PT0gLS0+CiAgCiAgPCEtLSBNdXNpY2FsIG5vdGVzIGZsb2F0aW5nIC0tPgogIDxnIGZpbGw9InJnYmEoMjU1LDE4MCwwLDAuNikiIGZpbHRlcj0idXJsKCNzb2Z0R2xvdykiPgogICAgPCEtLSBOb3RlIDEgLS0+CiAgICA8dGV4dCB4PSI5MCIgeT0iMTQwIiBmb250LXNpemU9IjMyIiBmb250LWZhbWlseT0ic2VyaWYiIHRyYW5zZm9ybT0icm90YXRlKC0xNSw5MCwxNDApIj7imao8L3RleHQ+CiAgICA8IS0tIE5vdGUgMiAtLT4KICAgIDx0ZXh0IHg9IjY4MCIgeT0iNTgwIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0ic2VyaWYiIHRyYW5zZm9ybT0icm90YXRlKDEwLDY4MCw1ODApIj7imas8L3RleHQ+CiAgICA8IS0tIE5vdGUgMyAtLT4KICAgIDx0ZXh0IHg9IjEyMCIgeT0iNjQwIiBmb250LXNpemU9IjIwIiBmb250LWZhbWlseT0ic2VyaWYiIHRyYW5zZm9ybT0icm90YXRlKC04LDEyMCw2NDApIj7imak8L3RleHQ+CiAgICA8IS0tIE5vdGUgNCAtLT4KICAgIDx0ZXh0IHg9IjcwMCIgeT0iMTMwIiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0ic2VyaWYiIHRyYW5zZm9ybT0icm90YXRlKDIwLDcwMCwxMzApIj7imao8L3RleHQ+CiAgICA8IS0tIE5vdGUgNSAtLT4KICAgIDx0ZXh0IHg9IjY4MCIgeT0iNzAwIiBmb250LXNpemU9IjI4IiBmb250LWZhbWlseT0ic2VyaWYiIHRyYW5zZm9ybT0icm90YXRlKC0xMiw2ODAsNzAwKSI+4pmrPC90ZXh0PgogICAgPHRleHQgeD0iNTUiIHk9IjQyMCIgZm9udC1zaXplPSIyMiIgZm9udC1mYW1pbHk9InNlcmlmIiB0cmFuc2Zvcm09InJvdGF0ZSg1LDU1LDQyMCkiPuKZqjwvdGV4dD4KICA8L2c+CgogIDwhLS0gU3RhcnMgLyBzcGFya2xlcyAtLT4KICA8ZyBmaWxsPSJyZ2JhKDI1NSwyMTUsMCwwLjcpIj4KICAgIDxwb2x5Z29uIHBvaW50cz0iMTQ1LDIyMCAxNTAsMjEwIDE1NSwyMjAgMTY1LDIyMCAxNTcsMjI3IDE2MCwyMzggMTUwLDIzMSAxNDAsMjM4IDE0MywyMjcgMTM1LDIyMCIgdHJhbnNmb3JtPSJzY2FsZSgwLjYpIHRyYW5zbGF0ZSg5NSwxMzApIi8+CiAgICA8cG9seWdvbiBwb2ludHM9IjE0NSwyMjAgMTUwLDIxMCAxNTUsMjIwIDE2NSwyMjAgMTU3LDIyNyAxNjAsMjM4IDE1MCwyMzEgMTQwLDIzOCAxNDMsMjI3IDEzNSwyMjAiIHRyYW5zZm9ybT0ic2NhbGUoMC40KSB0cmFuc2xhdGUoMTU4MCwxNDgwKSIvPgogICAgPHBvbHlnb24gcG9pbnRzPSIxNDUsMjIwIDE1MCwyMTAgMTU1LDIyMCAxNjUsMjIwIDE1NywyMjcgMTYwLDIzOCAxNTAsMjMxIDE0MCwyMzggMTQzLDIyNyAxMzUsMjIwIiB0cmFuc2Zvcm09InNjYWxlKDAuNSkgdHJhbnNsYXRlKDEwNDAsMjgwKSIvPgogIDwvZz4KCiAgPCEtLSA9PT0gVElUTEUgQkxPQ0sgYXQgYm90dG9tID09PSAtLT4KICA8IS0tIEJhY2tncm91bmQgc3RyaXAgZm9yIHRpdGxlIC0tPgogIDxyZWN0IHg9IjAiIHk9IjY2MCIgd2lkdGg9IjgwMCIgaGVpZ2h0PSIxNDAiIGZpbGw9InJnYmEoMCwwLDAsMC44NSkiLz4KICA8cmVjdCB4PSIwIiB5PSI2NjAiIHdpZHRoPSI4MDAiIGhlaWdodD0iMiIgZmlsbD0idXJsKCNnb2xkR3JhZCkiLz4KICAKICA8IS0tIERlY29yYXRpdmUgc2lkZSBiYXJzIC0tPgogIDxyZWN0IHg9IjAiIHk9IjY2MCIgd2lkdGg9IjYiIGhlaWdodD0iMTQwIiBmaWxsPSIjZTYzMDAwIi8+CiAgPHJlY3QgeD0iNzk0IiB5PSI2NjAiIHdpZHRoPSI2IiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2U2MzAwMCIvPgoKICA8IS0tIEFydGlzdCBuYW1lIC0tPgogIDx0ZXh0IHg9IjQwMCIgeT0iNzA4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiAKICAgICAgICBmb250LWZhbWlseT0iQXJpYWwgQmxhY2ssIEltcGFjdCwgc2Fucy1zZXJpZiIgCiAgICAgICAgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjkwMCIgCiAgICAgICAgZmlsbD0idXJsKCNnb2xkR3JhZCkiIAogICAgICAgIGxldHRlci1zcGFjaW5nPSI2IgogICAgICAgIGZpbHRlcj0idXJsKCNnbG93KSI+V0lMTElFIENPTMOTTjwvdGV4dD4KICAKICA8IS0tIFN1YnRpdGxlIC0tPgogIDx0ZXh0IHg9IjQwMCIgeT0iNzM1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiAKICAgICAgICBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIAogICAgICAgIGZvbnQtc2l6ZT0iMTMiIAogICAgICAgIGZpbGw9InJnYmEoMjU1LDE0MCwwLDAuOSkiIAogICAgICAgIGxldHRlci1zcGFjaW5nPSI4Ij5FTCBNQUxPICDCtyAgU0FMU0EgIMK3ICBGQU5JQSBSRUNPUkRTPC90ZXh0PgoKICA8IS0tIERlY29yYXRpdmUgZGl2aWRlciAtLT4KICA8bGluZSB4MT0iMTIwIiB5MT0iNzQ4IiB4Mj0iNjgwIiB5Mj0iNzQ4IiBzdHJva2U9InJnYmEoMjU1LDIxNSwwLDAuMykiIHN0cm9rZS13aWR0aD0iMSIvPgoKICA8IS0tIEJvdHRvbSB0YWdsaW5lIC0tPgogIDx0ZXh0IHg9IjQwMCIgeT0iNzcyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiAKICAgICAgICBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIAogICAgICAgIGZvbnQtc2l6ZT0iMTEiIAogICAgICAgIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC41KSIgCiAgICAgICAgbGV0dGVyLXNwYWNpbmc9IjQiPkJST05YICDCtyAgTkVXIFlPUksgIMK3ICBQQU5BTcOBPC90ZXh0PgoKICA8IS0tIENsYXZlIHJoeXRobSBkb3RzIGRlY29yYXRpb24gLS0+CiAgPGcgZmlsbD0icmdiYSgyNTUsMTIwLDAsMC42KSI+CiAgICA8Y2lyY2xlIGN4PSIxNjAiIGN5PSI3NjAiIHI9IjMiLz4KICAgIDxjaXJjbGUgY3g9IjE3NSIgY3k9Ijc2MCIgcj0iMyIvPgogICAgPGNpcmNsZSBjeD0iMTk3IiBjeT0iNzYwIiByPSIzIi8+CiAgICA8Y2lyY2xlIGN4PSIyMTIiIGN5PSI3NjAiIHI9IjMiLz4KICAgIDxjaXJjbGUgY3g9IjIzNCIgY3k9Ijc2MCIgcj0iMyIvPgogICAgPGNpcmNsZSBjeD0iNTY2IiBjeT0iNzYwIiByPSIzIi8+CiAgICA8Y2lyY2xlIGN4PSI1ODgiIGN5PSI3NjAiIHI9IjMiLz4KICAgIDxjaXJjbGUgY3g9IjYwMyIgY3k9Ijc2MCIgcj0iMyIvPgogICAgPGNpcmNsZSBjeD0iNjI1IiBjeT0iNzYwIiByPSIzIi8+CiAgICA8Y2lyY2xlIGN4PSI2NDAiIGN5PSI3NjAiIHI9IjMiLz4KICA8L2c+CgogIDwhLS0gT3V0ZXIgYm9yZGVyIGZyYW1lIC0tPgogIDxyZWN0IHg9IjgiIHk9IjgiIHdpZHRoPSI3ODQiIGhlaWdodD0iNzg0IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDE0MCwwLDAuMikiIHN0cm9rZS13aWR0aD0iMS41IiByeD0iNCIvPgogIDxyZWN0IHg9IjE0IiB5PSIxNCIgd2lkdGg9Ijc3MiIgaGVpZ2h0PSI3NzIiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsODAsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiIHJ4PSIzIi8+Cgo8L3N2Zz4=';
        const TROMBONE_URI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJ0ZyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmUwNjYiLz48c3RvcCBvZmZzZXQ9IjQwJSIgc3RvcC1jb2xvcj0iI2ZmZDcwMCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjcwJSIgc3RvcC1jb2xvcj0iI2I4ODYwYiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZmZDcwMCIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPGVsbGlwc2UgY3g9IjE3NSIgY3k9IjE4IiByeD0iMjIiIHJ5PSIxNCIgZmlsbD0idXJsKCN0ZykiIHRyYW5zZm9ybT0icm90YXRlKC0xMCwxNzUsMTgpIi8+CiAgPGVsbGlwc2UgY3g9IjE3NSIgY3k9IjE4IiByeD0iMTciIHJ5PSI5IiBmaWxsPSIjMWEwODAwIiB0cmFuc2Zvcm09InJvdGF0ZSgtMTAsMTc1LDE4KSIvPgogIDxsaW5lIHgxPSIxNTUiIHkxPSIyNiIgeDI9IjMwIiB5Mj0iNTAiIHN0cm9rZT0idXJsKCN0ZykiIHN0cm9rZS13aWR0aD0iOSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjE0MCIgeTE9IjMwIiB4Mj0iMTgiIHkyPSI1MiIgc3Ryb2tlPSIjYjg4NjBiIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxwYXRoIGQ9Ik0gMTYgNTIgUSA1IDYyIDEyIDcwIFEgMjAgNzcgMjggNzAgUSAzMiA2MCAyNiA1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ1cmwoI3RnKSIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8ZWxsaXBzZSBjeD0iMTYyIiBjeT0iMjIiIHJ4PSI1IiByeT0iMyIgZmlsbD0iI2ZmZDcwMCIgdHJhbnNmb3JtPSJyb3RhdGUoLTEwLDE2MiwyMikiLz4KICA8bGluZSB4MT0iMTYyIiB5MT0iMjIiIHgyPSIxODUiIHkyPSI4IiBzdHJva2U9IiNmZmQ3MDAiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPg==';
        const MINI_URI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0OCIgZmlsbD0iIzExMSIvPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQ0IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjM4IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNCkiIHN0cm9rZS13aWR0aD0iMC44Ii8+CiAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMzIiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA0KSIgc3Ryb2tlLXdpZHRoPSIwLjgiLz4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxOCIgZmlsbD0iI2M4MTAwMCIvPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjE3IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDIwMCwwLDAuNSkiIHN0cm9rZS13aWR0aD0iMSIvPgogIDx0ZXh0IHg9IjUwIiB5PSI0NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrIiBmb250LXNpemU9IjUiIGZpbGw9IiNmZmQ3MDAiIGxldHRlci1zcGFjaW5nPSIxIj5XSUxMSUU8L3RleHQ+CiAgPHRleHQgeD0iNTAiIHk9IjU0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwgQmxhY2siIGZvbnQtc2l6ZT0iNSIgZmlsbD0iI2ZmZiIgbGV0dGVyLXNwYWNpbmc9IjEiPkNPTMOTTjwvdGV4dD4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIzIiBmaWxsPSIjMDAwIi8+Cjwvc3ZnPg==';

        // Salsa quotes mapped to each slide
        const SALSA_QUOTES = [
            null, // slide 1 already has art
            { quote: "El que no sabe es como el que no ve.", author: "Willie Colón" },
            { quote: "La salsa no es música, es filosofía de vida.", author: "Willie Colón" },
            { quote: "Siembra lo que quieras cosechar.", author: "Rubén Blades ft. Willie Colón" },
            { quote: "El malo siempre sabe lo que hace.", author: "Willie Colón — El Malo, 1967" },
            { quote: "Toda tubería tiene su compás.", author: "Willie Colón" },
            { quote: "Cada barrio tiene su ritmo, cada deploy su ambiente.", author: "Willie Colón (paráfrasis)" },
            { quote: "La clave marca el tiempo… y el pipeline también.", author: "Ritmo Clave, 2-3" },
            { quote: "Buscando Guayaba — en cada bug hay una canción.", author: "Willie Colón" },
            { quote: "Che Che Colé — observa, escucha, actúa.", author: "Willie Colón" },
            { quote: "El Buen Pastor — protege tu código en producción.", author: "Willie Colón, 1975" },
            { quote: "Lo Mato — bugs muertos en staging, no en prod.", author: "Willie Colón" },
            { quote: "Idilio — un pipeline bien afinado es poesía.", author: "Willie Colón & Soledad Bravo" },
            { quote: "A todos los que se fueron… por no tener CI/CD.", author: "Willie Colón (paráfrasis)" },
            { quote: "El pipeline es la clave. La clave es todo.", author: "Willie Colón, Bronx 1968" },
        ];

        // Clave rhythm pattern (3-2 clave) in milliseconds
        const CLAVE_PATTERN = [0, 300, 600, 1100, 1500];

        // ── Floating notes engine ──
        const NOTES = ['♪', '♫', '♩', '♬', '♭', '♮'];
        function spawnNote() {
            const note = document.createElement('div');
            note.textContent = NOTES[Math.floor(Math.random() * NOTES.length)];
            const startX = Math.random() * 100;
            const dur = 4 + Math.random() * 6;
            note.style.cssText = `
    position:fixed;
    left:${startX}vw;
    bottom: -40px;
    font-size:${14 + Math.random() * 18}px;
    color:rgba(255,${120 + Math.floor(Math.random() * 100)},0,${0.3 + Math.random() * 0.4});
    pointer-events:none;
    z-index:50;
    animation: floatNote ${dur}s ease-out forwards;
    transform: rotate(${-20 + Math.random() * 40}deg);
  `;
            document.body.appendChild(note);
            setTimeout(() => note.remove(), dur * 1000);
        }

        setInterval(spawnNote, 1200);

        // ── Clave rhythm ticker on nav ──
        let claveIdx = 0;
        const navDots = document.querySelector('.progress-dots');
        function claveTick() {
            const dot = document.createElement('div');
            dot.style.cssText = `
    position:fixed; bottom:38px; left:50%;
    transform:translateX(-50%);
    width:6px;height:6px;border-radius:50%;
    background:var(--salsa-gold);
    animation:clavePop 0.3s ease-out forwards;
    pointer-events:none;z-index:200;
  `;
            document.body.appendChild(dot);
            setTimeout(() => dot.remove(), 400);
        }

        // ── Per-slide Willie badge injection ──
        function injectWillie(slideNum) {
            const slide = document.getElementById('s' + slideNum);
            if (!slide) return;

            // Remove old badges
            slide.querySelectorAll('.willie-slide-deco').forEach(e => e.remove());

            // Don't inject on slide 1 (already has full art)
            if (slideNum === 1) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'willie-slide-deco';

            // ── Mini vinyl spinning in corner ──
            const vinylCorner = document.createElement('img');
            vinylCorner.src = MINI_URI;
            vinylCorner.style.cssText = `
    position:absolute; bottom:80px; right:18px;
    width:64px; height:64px;
    opacity:0.22; border-radius:50%;
    animation:vinylSpinSlow 12s linear infinite;
    pointer-events:none; z-index:2;
  `;
            wrapper.appendChild(vinylCorner);

            // ── Trombone watermark ──
            const tromb = document.createElement('img');
            tromb.src = TROMBONE_URI;
            tromb.style.cssText = `
    position:absolute; top:50%; right:8px;
    transform:translateY(-50%);
    width:140px; height:42px;
    opacity:0.08; pointer-events:none; z-index:0;
  `;
            wrapper.appendChild(tromb);

            // ── Salsa quote footer ──
            if (SALSA_QUOTES[slideNum]) {
                const q = SALSA_QUOTES[slideNum];
                const quoteEl = document.createElement('div');
                quoteEl.className = 'salsa-quote-footer';
                quoteEl.innerHTML = `<span class="sq-mark">♪</span> <em>"${q.quote}"</em> <span class="sq-author">— ${q.author}</span>`;
                wrapper.appendChild(quoteEl);
            }

            // ── Slide number in salsa style ──
            const numBg = document.createElement('div');
            numBg.style.cssText = `
    position:absolute; right:-8px; bottom:72px;
    font-size:11rem; font-weight:900; line-height:1;
    color:rgba(230,48,0,0.05);
    font-family:'Syne',sans-serif;
    pointer-events:none; z-index:0; letter-spacing:-0.05em;
    user-select:none;
  `;
            numBg.textContent = String(slideNum).padStart(2, '0');
            wrapper.appendChild(numBg);

            // ── Red accent bar left ──
            const bar = document.createElement('div');
            bar.style.cssText = `
    position:absolute; left:0; top:0; bottom:0; width:3px;
    background:linear-gradient(180deg, var(--salsa-red) 0%, var(--salsa-gold) 50%, var(--salsa-red) 100%);
    pointer-events:none; z-index:2;
  `;
            wrapper.appendChild(bar);

            slide.appendChild(wrapper);
        }

        // Inject on slide change
        const origGoTo = window.goTo;
        window.goTo = function (n) {
            origGoTo(n);
            setTimeout(() => injectWillie(n), 50);
            // Clave burst on slide change
            CLAVE_PATTERN.forEach(delay => setTimeout(claveTick, delay));
        };

        // Inject on load for initial slide
        setTimeout(() => {
            for (let i = 2; i <= 14; i++) injectWillie(i);
        }, 200);

        // ════════════════════════════════════════════════════════════════
        //  🎺  OH QUÉ SERÁ — Willie Colón
        //  Audio real embebido como base64. Suena al primer gesto del
        //  usuario (click / keydown / touch) — requerimiento del browser.
        //  Fade in suave de 1s, fade out a los 30s, volumen al 70%.
        // ════════════════════════════════════════════════════════════════
        let salsaPlayed = false;

        function buildSalsa() {
            if (salsaPlayed) return;
            salsaPlayed = true;

            const audio = document.getElementById('salsa-audio');
            if (!audio) return;

            audio.volume = 0;
            audio.currentTime = 0;

            audio.play().then(() => {
                // Fade in over 1.2 seconds
                let vol = 0;
                const fadeIn = setInterval(() => {
                    vol = Math.min(vol + 0.04, 0.72);
                    audio.volume = vol;
                    if (vol >= 0.72) clearInterval(fadeIn);
                }, 50);

                // Toast
                const toast = document.getElementById('music-toast');
                if (toast) {
                    toast.innerHTML = '🎺 Willie Colón — Oh Qué Será';
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 7000);
                }

            }).catch(() => {
                // Autoplay blocked — silently ignore, user can click again
                salsaPlayed = false;
            });
        }

        // Arm on first user gesture (browser policy)
        let salsaArmed = false;
        function armSalsa() {
            if (!salsaArmed) { salsaArmed = true; buildSalsa(); }
        }
        ['click', 'keydown', 'touchstart'].forEach(ev =>
            document.addEventListener(ev, armSalsa, { once: true, passive: true })
        );
