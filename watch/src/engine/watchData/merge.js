import { archetypes } from './archetypes'

export const merge = {
    searching(cache, customCombo, ap) {
        let entityCount = 0
        while (entityInfos.get(entityCount).index == entityCount) {
            entityCount += 1
        }
        let next = 0,
            lineLength = 0
        for (let i = 0; i < entityCount; i++) {
            let ii = entityCount - 1 - i
            let archetypeIndex = entityInfos.get(ii).archetype
            if (
                archetypeIndex == archetypes.NormalTapNote.index ||
                archetypeIndex == archetypes.CriticalTapNote.index ||
                archetypeIndex == archetypes.NormalFlickNote.index ||
                archetypeIndex == archetypes.CriticalFlickNote.index ||
                archetypeIndex == archetypes.NormalTraceNote.index ||
                archetypeIndex == archetypes.CriticalTraceNote.index ||
                archetypeIndex == archetypes.NormalTraceFlickNote.index ||
                archetypeIndex == archetypes.CriticalTraceFlickNote.index ||
                archetypeIndex == archetypes.NormalSlideTraceNote.index ||
                archetypeIndex == archetypes.CriticalSlideTraceNote.index ||
                archetypeIndex == archetypes.NormalSlideStartNote.index ||
                archetypeIndex == archetypes.CriticalSlideStartNote.index ||
                archetypeIndex == archetypes.NormalSlideEndNote.index ||
                archetypeIndex == archetypes.CriticalSlideEndNote.index ||
                archetypeIndex == archetypes.NormalSlideEndTraceNote.index ||
                archetypeIndex == archetypes.CriticalSlideEndTraceNote.index ||
                archetypeIndex == archetypes.CriticalSlideEndFlickNote.index ||
                archetypeIndex == archetypes.NormalSlideEndFlickNote.index ||
                archetypeIndex == archetypes.NormalSlideTickNote.index ||
                archetypeIndex == archetypes.CriticalSlideTickNote.index ||
                archetypeIndex == archetypes.HiddenSlideTickNote.index ||
                archetypeIndex == archetypes.NormalAttachedSlideTickNote.index ||
                archetypeIndex == archetypes.CriticalAttachedSlideTickNote.index
            ) {
                lineLength += 1
                customCombo.get(ii).value.set(0, next)
                next = ii
            }
        }
        let currentEntity = next
        for (let i = 0; i < lineLength; i++) {
            let currentHead = currentEntity
            currentEntity = customCombo.get(currentEntity).value.get(0)
            for (let j = 0; j < 32; j++) {
                if (cache.get(j) == 0) {
                    cache.set(j, currentHead)
                    break
                }
                let A = cache.get(j)
                let B = currentHead
                cache.set(j, 0)
                currentHead = this.merge(customCombo, A, B, Math.pow(2, j), Math.pow(2, j))
            }
        }
        let head = -1
        let currentLen = 0
        for (let i = 0; i < 32; i++) {
            if (cache.get(i) == 0) continue
            if (head == -1) {
                head = cache.get(i)
                currentLen = Math.pow(2, i)
                continue
            }
            let A = head
            let B = cache.get(i)
            let Asize = currentLen
            let Bsize = Math.pow(2, i)
            cache.set(i, 0)
            head = this.merge(customCombo, A, B, Asize, Bsize)
            currentLen = Asize + Bsize
        }
        customCombo.get(0).start = head
        customCombo.get(0).length = lineLength
        let idx = 0
        let ptr = head
        let combo = 0
        while (idx < lineLength && ptr != customCombo.get(customCombo.get(0).tail).value.get(0)) {
            if ((replay.isReplay && customCombo.get(ptr).ap == true) || ap == true) {
                ap = true
                customCombo.get(ptr).ap = true
            }
            if (
                replay.isReplay &&
                (customCombo.get(ptr).judgment == Judgment.Good ||
                    customCombo.get(ptr).judgment == Judgment.Miss)
            )
                combo = 0
            else combo += 1
            customCombo.get(ptr).combo = combo
            ptr = customCombo.get(ptr).value.get(0)
            idx++
        }
        this.skipList(customCombo)
    },
    merge(customCombo, a, b, Asize, Bsize) {
        let Alen = 0
        let Blen = 0
        let A = a
        let B = b
        let newHead = customCombo.get(A).time > customCombo.get(B).time ? B : A
        let pointer = newHead
        if (customCombo.get(A).time > customCombo.get(B).time) {
            Blen += 1
            B = customCombo.get(B).value.get(0)
        } else {
            Alen += 1
            A = customCombo.get(A).value.get(0)
        }
        while (Alen < Asize && Blen < Bsize) {
            if (customCombo.get(A).time > customCombo.get(B).time) {
                customCombo.get(pointer).value.set(0, B)
                pointer = B
                B = customCombo.get(B).value.get(0)
                Blen += 1
            } else {
                customCombo.get(pointer).value.set(0, A)
                pointer = A
                A = customCombo.get(A).value.get(0)
                Alen += 1
            }
        }
        if (Alen < Asize) {
            customCombo.get(pointer).value.set(0, A)
            // 마지막 노드 찾기
            while (Alen < Asize) {
                pointer = A
                A = customCombo.get(A).value.get(0)
                Alen += 1
            }
        }
        if (Blen < Bsize) {
            customCombo.get(pointer).value.set(0, B)
            // 마지막 노드 찾기
            while (Blen < Bsize) {
                pointer = B
                B = customCombo.get(B).value.get(0)
                Blen += 1
            }
        }
        customCombo.get(pointer).value.set(0, -1)
        customCombo.get(0).tail = pointer
        return newHead
    },
    skipList(customCombo) {
        const head = customCombo.get(0).start
        const tail = customCombo.get(0).tail
        for (let level = 1; level < 4; level++) {
            let currentNode = customCombo.get(head).value.get(level - 1)
            let lastNode = head
            while (currentNode && currentNode !== tail) {
                if (Math.random() < 0.5) {
                    customCombo.get(lastNode).value.set(level, currentNode)
                    lastNode = currentNode
                }
                currentNode = customCombo.get(currentNode).value.get(level - 1)
            }
            customCombo.get(lastNode).value.set(level, tail)
        }
    },
}
